CREATE TABLE [dbo].[tblAddresses]
(
	[Id] UNIQUEIDENTIFIER NOT NULL,
	[Main] NVARCHAR(255) NULL,
	[Suite] NVARCHAR(255) NULL,
	[PostalCodeId] BIGINT NULL,
	[AddressTypeId] SMALLINT NULL,
	[OrganizationId] UNIQUEIDENTIFIER NULL,
	[LocationId] UNIQUEIDENTIFIER NULL,
	[PersonId] UNIQUEIDENTIFIER NULL,
	[Preferred] BIT NOT NULL DEFAULT 0,
	CONSTRAINT [PK_tblAddresses] PRIMARY KEY NONCLUSTERED ([Id] ASC),
	CONSTRAINT [FK_tblAddresses_PostalCodeId_tblPostalCodes_Id] FOREIGN KEY ([PostalCodeId]) REFERENCES [dbo].[tblPostalCodes](Id),
	CONSTRAINT [FK_tblAddresses_AddressTypeId_tblAddressTypes_Id] FOREIGN KEY ([AddressTypeId]) REFERENCES [dbo].[tblAddressTypes](Id),
	CONSTRAINT [FK_tblAddresses_OrganizationId_tblOrganizations_Id] FOREIGN KEY ([OrganizationId]) REFERENCES [dbo].[tblOrganizations](Id),
	CONSTRAINT [FK_tblAddresses_LocationId_tblLocations_Id] FOREIGN KEY ([LocationId]) REFERENCES [dbo].[tblLocations](Id),
	CONSTRAINT [FK_tblAddresses_PersonId_tblPeople_Id] FOREIGN KEY ([PersonId]) REFERENCES [dbo].[tblPeople](Id)
)