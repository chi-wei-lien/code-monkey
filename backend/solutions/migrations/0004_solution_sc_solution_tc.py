# Generated by Django 5.1.2 on 2024-10-30 18:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('solutions', '0003_solution_notes'),
    ]

    operations = [
        migrations.AddField(
            model_name='solution',
            name='sc',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='solution',
            name='tc',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
    ]
