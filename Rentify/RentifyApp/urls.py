from django.urls import path
from . import views

urlpatterns = [
    path('insert-property/', views.insert_property, name='insert_property'),
    path('get-all-properties/', views.get_all_properties, name='get_all_properties'),
    path('properties/<str:property_id>/seller/', views.get_seller_details, name='get_seller_details'),
    path('create-seller/', views.create_seller, name='create_seller'),


    path('register/', views.register_user, name='register_user'),
    path('login/', views.login_user, name='login_user'),
    path('get-user-details/', views.get_user_details, name='get_user_details'),
    # Add more paths for other views if needed
]
