from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('tweets/', include('tweets.urls')),
    path('noti/', include('noti.urls')),
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),  # This will catch all other URLs and serve the index.html
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
