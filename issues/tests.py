from django.test import TestCase
from django.contrib.auth.models import User, Group
from .models import Issue, Department
from rest_framework.test import APIClient, APITestCase
from django.urls import reverse
from .models import Issue, Department
from django.contrib.auth.models import User, Group

# Create your tests here.

class IssueModelTest(TestCase):
    def setUp(self):
        # Create a student user
        self.student = User.objects.create_user(username='student', password='testpass123')
        student_group = Group.objects.create(name='Student')
        self.student.groups.add(student_group)

        # Create a department
        self.department = Department.objects.create(name='Computer Science')

        # Create an issue
        self.issue = Issue.objects.create(
            student=self.student,
            department=self.department,
            issue_type='MISSING_MARKS',
            description='Missing marks for CSC 1202',
        )

    def test_issue_creation(self):
        self.assertEqual(self.issue.issue_type, 'MISSING_MARKS')
        self.assertEqual(self.issue.status, 'PENDING')
        self.assertEqual(self.issue.student.username, 'student')
        self.assertEqual(self.issue.department.name, 'Computer Science')

class IssueViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.student = User.objects.create_user(username='student', password='testpass123')
        student_group = Group.objects.create(name='Student')
        self.student.groups.add(student_group)

        self.department = Department.objects.create(name='Computer Science')
        self.issue = Issue.objects.create(
            student=self.student,
            department=self.department,
            issue_type='MISSING_MARKS',
            description='Missing marks for CSC 1202',
        )

    def test_issue_list_view(self):
        self.client.force_authenticate(user=self.student)
        response = self.client.get(reverse('issue-list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_issue_detail_view(self):
        self.client.force_authenticate(user=self.student)
        response = self.client.get(reverse('issue-detail', args=[self.issue.id]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['description'], 'Missing marks for CSC 1202')