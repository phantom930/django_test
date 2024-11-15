from django.http import JsonResponse
from rest_framework.authtoken.models import Token

class TokenAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path in ['/authentication/login', '/authentication/logout']:
            return self.get_response(request)
        
        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith('Token '):
            return JsonResponse({'error': 'Authorization token required'}, status=401)

        token_key = auth_header.split(' ')[1]
        try:
            token = Token.objects.get(key=token_key)
            request.user = token.user  # Attach user to the request
        except Token.DoesNotExist:
            return JsonResponse({'error': 'Invalid token'}, status=401)

        return self.get_response(request)