from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from .models import Properties, Seller
from .serializers import PropertiesSerializer, SellerSerializer
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

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

        try:
            # Create a new user
            user = User.objects.create_user(username=email, email=email, password=password)
            user.first_name = first_name
            user.last_name = last_name
            user.save()

            # Create a new seller profile for the user
            seller = Seller.objects.create(
                user=user,
                name=f"{first_name} {last_name}",
                phone=phone_number,
                email=email
            )

            return Response({"message": "User and seller profile registered successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def login_user(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')

        if not (email and password):
            return Response({"error": "Please provide email and password"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)

            token, created = Token.objects.get_or_create(user=user)
            seller = Seller.objects.get(email=user.email)

            return Response({
                "message": "User logged in successfully",
                "user_id": user.id,
                "username": user.username,
                "firstname": user.first_name,
                "lastname": user.last_name,
                "email": user.email,
                "phone": seller.phone,  # Ensure phone number is included
                "token": token.key
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
def insert_property(request):
    try:
        seller = request.user.seller_profile  # Get the seller profile of the authenticated user
    except Seller.DoesNotExist:
        return Response({"error": "Seller profile not found for the user."}, status=status.HTTP_404_NOT_FOUND)

    request.data['seller'] = seller.SellerId  # Set the seller ID in the request data
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_properties(request):
    user = request.user
    try:
        seller = Seller.objects.get(email=user.email)
        properties = Properties.objects.filter(seller=seller)
        serializer = PropertiesSerializer(properties, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Seller.DoesNotExist:
        return Response({'error': 'Seller not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_property(request, property_id):
    try:
        property_instance = Properties.objects.get(PropertyId=property_id)
    except Properties.DoesNotExist:
        return Response({'error': 'Property not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = PropertiesSerializer(property_instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def delete_property(request, property_id):
    if request.method == 'DELETE':
        try:
            property_instance = Properties.objects.get(PropertyId=property_id)
            property_instance.delete()
            return JsonResponse({'message': 'Property deleted successfully'}, status=204)
        except Properties.DoesNotExist:
            return JsonResponse({'error': 'Property not found'}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)




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