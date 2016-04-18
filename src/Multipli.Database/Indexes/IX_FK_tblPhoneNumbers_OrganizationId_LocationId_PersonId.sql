CREATE CLUSTERED INDEX [IX_FK_tblPhoneNumbers_OrganizationId_LocationId_PersonId]
	ON [dbo].[tblPhoneNumbers]
	(OrganizationId, LocationId, PersonId)
