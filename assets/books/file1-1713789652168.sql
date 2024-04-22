/****** Object:  Table [dbo].[Category]    Script Date: 22.12.2021 0:12:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[id] [int] NOT NULL,
	[nameCat] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category_has_good]    Script Date: 22.12.2021 0:12:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category_has_good](
	[category_id] [int] NOT NULL,
	[good_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[category_id] ASC,
	[good_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[client]    Script Date: 22.12.2021 0:12:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[client](
	[id] [int] NOT NULL,
	[code] [varchar](45) NULL,
	[first_name] [varchar](45) NOT NULL,
	[last_name] [varchar](45) NULL,
	[sources_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Good]    Script Date: 22.12.2021 0:12:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Good](
	[id] [int] NOT NULL,
	[nameGood] [nvarchar](255) NULL,
	[price] [decimal](16, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sale]    Script Date: 22.12.2021 0:12:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sale](
	[id] [int] NOT NULL,
	[client_id] [int] NOT NULL,
	[number] [varchar](255) NULL,
	[dt_created] [datetime] NOT NULL,
	[dt_modified] [datetime] NOT NULL,
	[sale_sum] [decimal](18, 2) NULL,
	[status_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sale_has_good]    Script Date: 22.12.2021 0:12:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sale_has_good](
	[sale_id] [int] NOT NULL,
	[good_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[sale_id] ASC,
	[good_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sale_history]    Script Date: 22.12.2021 0:12:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sale_history](
	[id] [int] NOT NULL,
	[sale_id] [int] NOT NULL,
	[status_id] [int] NOT NULL,
	[sale_sum] [decimal](18, 2) NULL,
	[active_from] [datetime] NOT NULL,
	[active_to] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sources]    Script Date: 22.12.2021 0:12:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sources](
	[id] [int] NOT NULL,
	[nameSources] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[status]    Script Date: 22.12.2021 0:12:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[status](
	[id] [int] NOT NULL,
	[nameStatus] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [fk_category_has_good_category_idx]    Script Date: 22.12.2021 0:12:01 ******/
CREATE NONCLUSTERED INDEX [fk_category_has_good_category_idx] ON [dbo].[Category_has_good]
(
	[category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [fk_category_has_good_good1_idx]    Script Date: 22.12.2021 0:12:01 ******/
CREATE NONCLUSTERED INDEX [fk_category_has_good_good1_idx] ON [dbo].[Category_has_good]
(
	[good_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [fk_client_source1_idx]    Script Date: 22.12.2021 0:12:01 ******/
CREATE NONCLUSTERED INDEX [fk_client_source1_idx] ON [dbo].[client]
(
	[sources_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [fk_order_has_good_good1_idx]    Script Date: 22.12.2021 0:12:01 ******/
CREATE NONCLUSTERED INDEX [fk_order_has_good_good1_idx] ON [dbo].[sale_has_good]
(
	[good_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [fk_order_has_good_sale1_idx]    Script Date: 22.12.2021 0:12:01 ******/
CREATE NONCLUSTERED INDEX [fk_order_has_good_sale1_idx] ON [dbo].[sale_has_good]
(
	[sale_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [fk_order_history_sale1_idx]    Script Date: 22.12.2021 0:12:01 ******/
CREATE NONCLUSTERED INDEX [fk_order_history_sale1_idx] ON [dbo].[sale_history]
(
	[sale_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [fk_order_history_status1_idx]    Script Date: 22.12.2021 0:12:01 ******/
CREATE NONCLUSTERED INDEX [fk_order_history_status1_idx] ON [dbo].[sale_history]
(
	[status_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Category_has_good]  WITH CHECK ADD  CONSTRAINT [fk_category_has_good_category] FOREIGN KEY([category_id])
REFERENCES [dbo].[Category] ([id])
GO
ALTER TABLE [dbo].[Category_has_good] CHECK CONSTRAINT [fk_category_has_good_category]
GO
ALTER TABLE [dbo].[Category_has_good]  WITH CHECK ADD  CONSTRAINT [fk_category_has_good_good1] FOREIGN KEY([good_id])
REFERENCES [dbo].[Good] ([id])
GO
ALTER TABLE [dbo].[Category_has_good] CHECK CONSTRAINT [fk_category_has_good_good1]
GO
ALTER TABLE [dbo].[client]  WITH CHECK ADD  CONSTRAINT [fk_client_source1] FOREIGN KEY([sources_id])
REFERENCES [dbo].[sources] ([id])
GO
ALTER TABLE [dbo].[client] CHECK CONSTRAINT [fk_client_source1]
GO
ALTER TABLE [dbo].[sale]  WITH CHECK ADD  CONSTRAINT [fk_order_client1] FOREIGN KEY([client_id])
REFERENCES [dbo].[client] ([id])
GO
ALTER TABLE [dbo].[sale] CHECK CONSTRAINT [fk_order_client1]
GO
ALTER TABLE [dbo].[sale]  WITH CHECK ADD  CONSTRAINT [fk_order_status1] FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([id])
GO
ALTER TABLE [dbo].[sale] CHECK CONSTRAINT [fk_order_status1]
GO
ALTER TABLE [dbo].[sale_has_good]  WITH CHECK ADD  CONSTRAINT [fk_order_has_good_good1] FOREIGN KEY([good_id])
REFERENCES [dbo].[Good] ([id])
GO
ALTER TABLE [dbo].[sale_has_good] CHECK CONSTRAINT [fk_order_has_good_good1]
GO
ALTER TABLE [dbo].[sale_has_good]  WITH CHECK ADD  CONSTRAINT [fk_order_has_good_sale1] FOREIGN KEY([sale_id])
REFERENCES [dbo].[sale] ([id])
GO
ALTER TABLE [dbo].[sale_has_good] CHECK CONSTRAINT [fk_order_has_good_sale1]
GO
ALTER TABLE [dbo].[sale_history]  WITH CHECK ADD  CONSTRAINT [fk_order_history_sale1] FOREIGN KEY([sale_id])
REFERENCES [dbo].[sale] ([id])
GO
ALTER TABLE [dbo].[sale_history] CHECK CONSTRAINT [fk_order_history_sale1]
GO
ALTER TABLE [dbo].[sale_history]  WITH CHECK ADD  CONSTRAINT [fk_order_history_status1] FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([id])
GO
ALTER TABLE [dbo].[sale_history] CHECK CONSTRAINT [fk_order_history_status1]
GO
USE [master]
GO
ALTER DATABASE [Store] SET  READ_WRITE 
GO
