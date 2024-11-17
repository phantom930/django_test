from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Product(models.Model):
  name = models.CharField(max_length=100)
  description = models.TextField()
  price = models.DecimalField(max_digits=10, decimal_places=2)
  stock = models.IntegerField(default=0)

  def __str__(self):
    return self.name
  
class UserProduct(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_products')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='user_products')

    class Meta:
      unique_together = ('user', 'product')

    def __str__(self):
      return f"{self.user.username} - {self.product.name}"