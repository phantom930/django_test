from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import Product
from .models import UserProduct
from .serializers import ProductSerializer

# Create your views here.
@api_view(['GET'])
def product_list(request):
  search_query = request.GET.get('query', '')
  user_id = request.user.id

  if not search_query:
    return Response({"products": [], "selected_products": []})

  products = Product.objects.filter(name__icontains=search_query)
  selected_products = UserProduct.objects.filter(user_id=user_id).values_list("product_id", flat=True)
  serializer = ProductSerializer(products, many=True)
  return Response({"products": serializer.data, "selected": selected_products})

@csrf_exempt
@api_view(['POST'])
def product_select(request):
  user_id = request.user.id
  product_id = request.data.get("id")

  if not product_id:
    return Response({"error": "Product ID is required"}, status=status.HTTP_400_BAD_REQUEST)
  
  user_product, created = UserProduct.objects.get_or_create(user_id=user_id, product_id=product_id)

  if not created:
    user_product.delete()
    return Response({"message": "Product deselected", "id": product_id}, status=status.HTTP_200_OK)

  # If it was created, it means the product was selected
  return Response({"message": "Product selected", "id": product_id}, status=status.HTTP_201_CREATED)
