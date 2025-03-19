from django.http import JsonResponse

def sample_view(request):
    return JsonResponse({"message": "This is a test response."})
