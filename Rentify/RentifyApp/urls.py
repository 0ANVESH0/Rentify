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
    path('my-properties/', views.my_properties, name='my_properties'),
    path('update-property/<str:property_id>/', views.update_property, name='update_property'),
    path('delete-property/<int:property_id>/', views.delete_property, name='delete_property'),
    # Add more paths for other views if needed
]
