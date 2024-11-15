from django.urls import path
from .views import product_list

urlpatters = [
  path('', product_list, name='product-list'),
]