from django.contrib import admin
from .models import Group, PartOfGroup

class GroupAdmin(admin.ModelAdmin):
    readonly_fields = ('group_id',)

admin.site.register(Group, GroupAdmin)
admin.site.register(PartOfGroup)
