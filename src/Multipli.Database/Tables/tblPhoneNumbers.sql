CREATE TABLE [dbo].[tblPhoneNumbers]
(
	[Id] UNIQUEIDENTIFIER NOT NULL,
	[Number] NVARCHAR(20) NOT NULL,
	[PhoneNumberTypeId] SMALLINT NOT NULL,
	[OrganizationId] UNIQUEIDENTIFIER NULL,
	[LocationId] UNIQUEIDENTIFIER NULL,
	[PersonId] UNIQUEIDENTIFIER NULL,
	CONSTRAINT [PK_tblPhoneNumbers] PRIMARY KEY NONCLUSTERED ([Id] ASC),
	CONSTRAINT [FK_tblPhoneNumbers_PhoneNumberTypeId_tblPhoneNumberTypes_Id] FOREIGN KEY ([PhoneNumberTypeId]) REFERENCES [dbo].[tblPhoneNumberTypes](Id),
	CONSTRAINT [FK_tblPhoneNumbers_OrganizationId_tblOrganizations_Id] FOREIGN KEY ([OrganizationId]) REFERENCES [dbo].[tblOrganizations](Id),
	CONSTRAINT [FK_tblPhoneNumbers_LocationId_tblLocations_Id] FOREIGN KEY ([LocationId]) REFERENCES [dbo].[tblLocations](Id),
	CONSTRAINT [FK_tblPhoneNumbers_PersonId_tblPeople_Id] FOREIGN KEY ([PersonId]) REFERENCES [dbo].[tblPeople](Id)
)
