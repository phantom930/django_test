from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer

# Create your views here.
@api_view(['GET'])
def product_list(request):
  search_query = request.GET.get('query', '')

  if not search_query:
    return Response([])

  products = Product.objects.filter(name__icontains=search_query)
  serializer = ProductSerializer(products, many=True)
  return Response(serializer.data)

@api_view(['POST'])
def product_select(request):
  product_id = request.data.get("id")

  if not product_id:
    return Response({"error": "Product ID is required"}, status=status.HTTP_400_BAD_REQUEST)
  
  product = get_object_or_404(Product, id=product_id)

  product.select = not product.select
  product.save()

  return Response({"id": product.id})
