from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from products.models import Product

class Command(BaseCommand):
    help = "Seed the database with sample data"

    def handle(self, *args, **options):
        products = [
            {"name": "Laptop", "description": "High performance laptop", "price": 999.99, "stock": 10},
            {"name": "Smartphone", "description": "Latest smartphone model", "price": 699.99, "stock": 25},
            {"name": "Headphones", "description": "Noise-cancelling headphones", "price": 199.99, "stock": 50},
            {"name": "Monitor", "description": "4K Ultra HD monitor", "price": 299.99, "stock": 15},
        ]
        for product in products:
            Product.objects.create(
                name=product["name"],
                description=product["description"],
                price=product["price"],
                stock=product["stock"],
            )

        self.stdout.write(self.style.SUCCESS("Database seeded successfully!"))

        
        # Check if a superuser already exists
        if not User.objects.filter(is_superuser=True).exists():
            # Create a superuser
            User.objects.create_superuser(
                username="admin",
                email="admin@example.com",
                password="admin"
            )
            self.stdout.write(self.style.SUCCESS("Superuser created successfully!"))
        else:
            self.stdout.write(self.style.WARNING("A superuser already exists."))
