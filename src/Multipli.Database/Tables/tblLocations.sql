CREATE TABLE [dbo].[tblLocations]
(
	[Id] UNIQUEIDENTIFIER NOT NULL,
	[OrganizationId] UNIQUEIDENTIFIER NOT NULL,
	[Name] NVARCHAR(1024) NOT NULL,
	[Hostname] NVARCHAR(15) NULL,
	[CustomUrl] NVARCHAR(1024) NULL,
	[IsAuthorized] BIT NOT NULL DEFAULT 1,
	CONSTRAINT [PK_tblLocations] PRIMARY KEY NONCLUSTERED ([Id], [OrganizationId] ASC),
	CONSTRAINT [FK_tblLocations_OrganizationId_tblOrganizations_Id] FOREIGN KEY ([OrganizationId]) REFERENCES [dbo].[tblOrganizations]([Id]),
	CONSTRAINT [UC_tblLocations_Hostname] UNIQUE ([Hostname]),
	CONSTRAINT [UC_tblLocations_CustomUrl] UNIQUE ([CustomUrl])
)
