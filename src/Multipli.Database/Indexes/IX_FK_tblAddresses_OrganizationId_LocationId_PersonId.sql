CREATE CLUSTERED INDEX [IX_FK_tblAddresses_OrganizationId_LocationId_PersonId]
	ON [dbo].[tblAddresses]
	(OrganizationId, LocationId, PersonId)
