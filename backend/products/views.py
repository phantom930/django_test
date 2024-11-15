from django.shortcuts import render
from rest_framework.decorators import api_view
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