from django.db import models

# Create your models here.

class Seller(models.Model):
    SellerId = models.CharField(primary_key=True, max_length=255)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField()

    def __str__(self):
        return self.name

class Properties(models.Model):
    PropertyId=models.CharField(primary_key=True,max_length=255)
    AddressLine1 =models.CharField(max_length=255)
    AddressLine2=models.CharField(max_length=255,null=True)
    City=models.CharField(max_length=255)
    Pin=models.IntegerField()
    State=models.CharField(max_length=255)
    Country=models.CharField(max_length=255)
    AreaInSqFt=models.IntegerField()
    BHK=models.IntegerField()
    Bathrooms=models.IntegerField()
    Rent=models.IntegerField()
    Brokerage=models.IntegerField(default=0)
    MaintenanceCharge=models.IntegerField(default=0)
    Deposit=models.IntegerField()
    Floor=models.IntegerField()
    PropertyType=models.CharField(max_length=255)
    PostedOn=models.DateField(auto_now=True)


    # ForeignKey relation to Seller
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE, related_name='properties')



