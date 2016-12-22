# 增
## 创建表
```sql
	Create Table 表名(
		列名1 数据类型 约束条件1 约束条件2 ... ,
		列名2 数据类型 约束条件1 约束条件2 ... ,
		列名3 数据类型 约束条件1 约束条件2 ... ,
		)
```
* 常用约束条件有：`Not NULL`，`Unique`，`Primary Key`，`Foreign Key`，`Check，Default`
* 撤销约束条件：`Alter Table 表名 Drop Constraint 列名`
* 撤销Default约束：`Alter Table 表名 Alter Column 列名 Drop Default`


## 插入数据
```sql
	Insert Into 表名 [Values] (值1, 值2, ...)
	Insert Into 表名 (列1, 列2, ...) [Values] (值1, 值2, ...)
	Insert Into 表名 (列1, 列2, ...)  SELECT 列1, 列2, ... From 表2
```

## 添加列
```sql
	Alter Table 表名 Add 列名 数据类型 Default 默认值 with values
```

## 复制表
```sql
	Select 列1, 列2, ... Into 表名2 From 表名1
```

# 删
## 删除表
```sql
	Drop Table 表名
```
一般在删除表之前还需要检查所要删除的表是否存在，以免警告信息。
```sql
IF OBJECT_ID('#temp') IS NOT NULL Drop Table #temp;
--删除表

IF OBJECT_ID('TEMPDB.DBO.#temp') IS NOT NULL Drop Table #temp;
--删除临时表
```

## 删除数据
```sql
	Delete From 表名 Where 某列=某值 and ...
	--无Where子句里删除表中所有数据，但保留表结构、属性、约束、索引等。

	Truncate Table 表名
	--删除表中所有数据，但保留表结构、属性、约束、索引等。速度比`Delete`快。
```


## 删除列
```sql
	Alter Table 表名 Drop Column 列名
```

# 改
## 修改数据
```sql
	Update 表名 Set 列1=值1, 列2=值2, ... Where 某列=某值 and ...
	Update 表名 Set 列1=值1, 列2=值2, ... [From 某数据集] Where 某列=某值 and ...
```

## 修改列的数据类型
```sql
	Alter Table 表名 Alter Column 列名 数据类型
```

## 修改列名
```sql
	USE DBName;
	GO
	EXEC sp_rename 'TableName.OldColumnName', 'NewColumnName', 'COLUMN';
	GO
```

# 查


# 其它
## IP地址分隔
```sql
	DECLARE @IP VARCHAR(100)
	SET @IP='211.151.122.57'
	SELECT PARSENAME(@IP,4),PARSENAME(@IP,3),PARSENAME(@IP,2),PARSENAME(@IP,1)
```

## While循环
```sql
	declare @k int,@n int
	set @k=1
	set @n=3
	while @k<=@n
		begin
			select @k
			set @k=@k+1
		end
```