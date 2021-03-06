USE [accsys]
GO
/****** Object:  UserDefinedFunction [dbo].[FindCity]    Script Date: 2015-12-30 16:28:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		LiXuan
-- Create date: '2015-12-30'
-- Description:	根据IP查询城市
-- =============================================
ALTER FUNCTION [dbo].[FindCity](@IP varchar(30))
Returns  varchar(100)
AS
Begin
	Declare @rs varchar(100)='其它.其它',@endIPNum bigint,@IPn bigint;
	If ISNUMERIC(@IP)=1
		Begin
			Set @IPn=Convert(bigint,@IP);
			If @IPn>=16777472 and @IPn<=3758095871
				SELECT top 1 @endIPNum=a.endIpNum,@rs=concat(a.CRegion,'.',a.[CCity])
					FROM [accsys].[dbo].[Date_OnlyChinaGeo] a
					where @IPn>=a.startIpNum
					order by a.startIpNum desc;
			if @IPn>@endIPNum set @rs='其它.其它';
		End
	Else
		Begin
			If  @IP is not null
				and @IP<>'' 
				and len(@IP)<16 
				and len(@IP)-len(replace(@IP,'.',''))=3
				and PATINDEX('%[^0-9.]%',@IP)=0
				and left(@IP,3)<>'10.'
				and left(@IP,4)<>'127.'
				and left(@IP,8)<>'192.168.'
				Begin
					Declare
						@IP1 bigint=CONVERT(bigint, PARSENAME(@ip, 4)),
						@IP2 bigint=CONVERT(bigint, PARSENAME(@ip, 3)),
						@IP3 bigint=CONVERT(bigint, PARSENAME(@ip, 2)),
						@IP4 bigint=CONVERT(bigint, PARSENAME(@ip, 1));
					If		@IP1 between 0 and 255
						and	@IP2 between 0 and 255
						and	@IP3 between 0 and 255
						and	@IP4 between 0 and 255
						Begin
							set @IPn=16777216*@IP1+65536*@IP2+256*@IP3+@IP4;
							if @IPn>=16777472 and @IPn<=3758095871
								SELECT top 1 @endIPNum=a.endIpNum,@rs=concat(a.CRegion,'.',a.[CCity])
									FROM [accsys].[dbo].[Date_OnlyChinaGeo] a
									where @IPn>=a.startIpNum
									order by a.startIpNum desc;
							if @IPn>@endIPNum set @rs='其它.其它';
						End
				End
		End
	Return @rs;
End
