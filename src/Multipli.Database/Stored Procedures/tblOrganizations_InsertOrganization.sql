CREATE PROCEDURE [dbo].[tblOrganizations_InsertOrganization]
	@Name		NVARCHAR(1024),
	@Hostname	NVARCHAR(25)
AS
	INSERT INTO [dbo].[tblOrganizations] (
		Id
	   ,Name
	   ,Hostname
	   ,CreatedDate
		)
	SELECT 
		NEWID()
	   ,@Name
	   ,@Hostname
	   ,GETUTCDATE();

