"""
URL configuration for aits project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, re_path
from django.views.generic import TemplateView

from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('Acd_track.urls')),
    path('accounts/', include('accounts.urls')),
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
    #path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]+static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)+static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)
 