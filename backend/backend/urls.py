from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from employees.views import EmployeeViewSet

router = routers.DefaultRouter()
router.register(r'employees', EmployeeViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
