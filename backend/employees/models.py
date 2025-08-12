from django.db import models

class Employee(models.Model):
    name = models.CharField(max_length=100)
    email_address = models.EmailField(max_length=254, blank=True, null=True)
    telephone_number = models.CharField(max_length=15, blank=True, null=True)
    position = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    marital_status = models.BooleanField(choices=[(True, 'Yes'), (False, 'No')], default=False)

    def __str__(self):
        return self.name