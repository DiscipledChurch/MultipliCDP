CREATE PROCEDURE [dbo].[tblOrganizations_UpdateOrganization]
	@Id			UNIQUEIDENTIFIER,
	@Name		NVARCHAR(1024),
	@Hostname	NVARCHAR(25)
AS
	UPDATE [dbo].[tblOrganizations]
	SET
		Name = @Name
	   ,Hostname = @Hostname
	WHERE
		Id = @Id 
