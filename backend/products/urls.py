from django.urls import path
from .views import product_list, product_select

urlpatterns = [
  path('list', product_list, name='product-list'),
  path('select', product_select, name='product-select'),
]