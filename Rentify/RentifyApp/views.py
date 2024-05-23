from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from .models import Properties,Seller
from .serializers import PropertiesSerializer
from .serializers import SellerSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth.decorators import login_required

@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        first_name = request.data.get('FirstName')
        last_name = request.data.get('LastName')
        email = request.data.get('email')
        phone_number = request.data.get('PhoneNumber')
        password = request.data.get('password')

        if not (first_name and last_name and email and phone_number and password):
            return Response({"error": "Please provide all required fields"}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new user
        try:
            user = User.objects.create_user(username=email, email=email, password=password)
            user.first_name = first_name
            user.last_name = last_name
            user.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
'''
@api_view(['POST'])
def login_user(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')

        if not (email and password):
            return Response({"error": "Please provide email and password"}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate user
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return Response({"message": "User logged in successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
'''
@api_view(['GET', 'POST'])
def login_user(request):
    if request.method == 'POST':
        # Handle login logic for POST requests
        email = request.data.get('email')
        password = request.data.get('password')

        if not (email and password):
            return Response({"error": "Please provide email and password"}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate user
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)

            # Generate or get existing token
            token, created = Token.objects.get_or_create(user=user)

            # Return user data along with token
            return Response({
                "message": "User logged in successfully",
                "user_id": user.id,
                "username": user.username,
                "firstname":user.first_name,
                "lastname":user.last_name,
                "email": user.email,
                "token": token.key
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    elif request.method == 'GET':
        # Render login form for GET requests
        # Implement your login form rendering logic here
        return Response({"message": "This is the login form."}, status=status.HTTP_200_OK)
        

@login_required
def get_user_details(request):
    user = request.user
    user_data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,  # Include first name
        'last_name': user.last_name,    # Include last name
        # Add more fields as needed
    }
    return Response(user_data)
            


@api_view(['POST'])
def insert_property(request):
    if request.method == 'POST':
        seller_id = request.data.get('seller')
        if not Seller.objects.filter(SellerId=seller_id).exists():
            return Response({"seller": [f"Invalid pk \"{seller_id}\" - object does not exist."]},
                            status=status.HTTP_400_BAD_REQUEST)
        
        serializer = PropertiesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_all_properties(request):
    properties = Properties.objects.all()
    serializer = PropertiesSerializer(properties, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_seller_details(request, property_id):
    try:
        property = Properties.objects.get(PropertyId=property_id)
        seller = property.seller  # ForeignKey relation in Properties model to Seller
        serializer = SellerSerializer(seller)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Properties.DoesNotExist:
        return Response({'error': 'Property not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def create_seller(request):
    serializer = SellerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)