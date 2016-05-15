CREATE TABLE [dbo].[tblPeopleRoles]
(
	[PersonId] UNIQUEIDENTIFIER NOT NULL,
	[LocationId] UNIQUEIDENTIFIER NOT NULL,
	[RoleId] SMALLINT NOT NULL,
	CONSTRAINT [PK_tblPeopleRoles] PRIMARY KEY ([PersonId], [LocationId] ASC),
	CONSTRAINT [FK_tblPeopleRoles_PersonId_tblPeople_Id] FOREIGN KEY ([PersonId]) REFERENCES [dbo].[tblPeople]([Id]),
	CONSTRAINT [FK_tblPeopleRoles_LocationId_tblLocations_Id] FOREIGN KEY ([LocationId]) REFERENCES [dbo].[tblLocations]([Id]),
	CONSTRAINT [FK_tblPeopleRoles_RoleId_tblRoles_Id] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[tblRoles]([Id])
)
