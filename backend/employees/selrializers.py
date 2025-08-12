from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'name', 'email_address', 'telephone_number', 'position', 'address', 'marital_status']
        extra_kwargs = {
            'name': {'required': False},
            'email_address': {'required': False},
            'telephone_number': {'required': False},
            'position': {'required': False},
            'address': {'required': False},
            'marital_status': {'required': False},
        }
