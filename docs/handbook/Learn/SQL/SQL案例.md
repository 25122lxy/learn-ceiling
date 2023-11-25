# SQL案例

## Mysql

**SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY ... LIMIT...**

### 1.基础语法 - 查询 - 全表查询

```sql
select * from student;
```

### 2.基础语法 - 查询 - 选择查询

```sql
select id,name from student;
```

### 3.基础语法 - 查询 - 别名

```sql
select username as '用户名' from student;
select username as 用户名 from student;
select username '用户名' from student;
```

### 4.基础语法 - 查询 - 常量和运算

```sql
select name, score, score * 2 as double_score from student;
```

### 5、基础语法 - 条件查询 - where

```sql
select name from student where id = 3;
```

### 6、基础语法 - 条件查询 - 运算符

运算符是 SQL 中用于在条件查询中进行条件判断的特殊符号，比如 `=`、 `!=`、`<`、`>` 等

```sql
select name, age, salary from employees where age between 25 and 30;
```

### 7. 基于语法-条件查询-空值✔

- 空值表示该字段的值是未知的、不存在的或者没有被填写的。在SQL查询中，我们可以使用 "IS NULL" 和 "IS NOT NULL" 来判断字段是否为空值或非空值。

eg：从名为 student 的数据表中选择出所有学生的姓名（name）、年龄（age）和成绩（score），要求学生年龄不为空值。
```sql
select
  name,
  age,
  score
from
  student
where
  age is not null;
```

### 8、基础语法-条件查询-模糊查询✔

- 百分号（%）：表示任意长度的任意字符序列。
- 下划线（_）：表示任意单个字符。

eg：从名为 `student` 的数据表中选择出所有学生的姓名（name）和成绩（score），要求姓名（name）不包含 "李" 这个字。

```sql
select
  name,
  score
from
  student
where
  name not like '%李%';
```

### 9、基础语法-条件查询-逻辑运算

在逻辑运算中，常用的运算符有：

- AND：表示逻辑与，要求同时满足多个条件，才返回 true。
- OR：表示逻辑或，要求满足其中任意一个条件，就返回 true。
- NOT：表示逻辑非，用于否定一个条件（本来是 true，用了 not 后转为 false）

### 10、基础语法-去重

在 SQL 中，我们可以使用 `DISTINCT` 关键字来实现去重操作。

### 11.基础语法-排序✔

- 在 SQL 中，我们可以使用 `ORDER BY` 关键字来实现排序操作。`ORDER BY` 后面跟上需要排序的字段，可以选择升序（ASC）或降序（DESC）排列。默认为升序（ASC）

eg：从名为 `student` 的数据表中选择出学生姓名（name）、年龄（age）和成绩（score），首先按照成绩从大到小排序，如果成绩相同，则按照年龄从小到大排序。

```sql
select
  name,
  age,
  score
from
  student
order by
  score desc,
  age asc;
```

### 12.基础语法 - 截断和偏移-limit✔

在 SQL 中，我们使用 `LIMIT` 关键字来实现数据的截断和偏移。

eg：从名为 `student` 的数据表中选择学生姓名（name）和年龄（age），按照年龄从小到大排序，从第 2 条数据开始、截取 3 个学生的信息。

```sql
select
  name,
  age
from
  student
order by
  age asc
limit
  1, 3;
```

**补充**

```sql
select id,name from studnet limit 2,10;#从第3条开始查，查询10行数据
select id,name from student limit 5;#查询前5行数据
select id,name from student limit 3 offset 6;#从第7条开始查，查询3条数据
```

### 13.基础语法-条件分支✔

条件分支 `case when` 是 SQL 中用于根据条件进行分支处理的语法。它类似于其他编程语言中的 if else 条件判断语句，允许我们根据不同的条件选择不同的结果返回。

`case when` 支持同时指定多个分支，示例语法如下：

```sql
CASE WHEN (条件1) THEN 结果1
	   WHEN (条件2) THEN 结果2
	   ...
	   ELSE 其他结果 END
```

eg：假设有一个学生表 `student`，包含以下字段：`name`（姓名）、`age`（年龄）。请你编写一个 SQL 查询，将学生按照年龄划分为三个年龄等级（age_level）：60 岁以上为 "老同学"，20 岁以上（不包括 60 岁以上）为 "年轻"，20 岁及以下、以及没有年龄信息为 "小同学"。

返回结果应包含学生的姓名（name）和年龄等级（age_level），并按姓名升序排序。

```sql
select
  name,
  case
    when (age > 60) then '老同学'
    when (age > 20) then '年轻'
    else '小同学'
  end "age_level"
from
  student
order by
  name asc;
```

### 14. 函数-时间函数✔

MySQL 提供了许多用于处理时间和日期的内置函数。以下是一些常用的 MySQL 时间日期函数：

1. `NOW()`：返回当前日期和时间。
   
   ```sql
   SELECT NOW();
   ```
   
2. `CURDATE()`：返回当前日期。
   ```sql
   SELECT CURDATE();
   select current_date();
   ```
   
3. `CURTIME()`：返回当前时间。
   ```sql
   SELECT CURTIME();
   select current_time();
   ```
   
4. `DATE()`：从日期时间值中提取日期部分。
   ```sql
   SELECT DATE('2023-08-27 15:30:45');
   ```

5. `TIME()`：从日期时间值中提取时间部分。
   ```sql
   SELECT TIME('2023-08-27 15:30:45');
   ```

6. `YEAR()`：从日期或日期时间值中提取年份。
   ```sql
   SELECT YEAR('2023-08-27');
   ```

7. `MONTH()`：从日期或日期时间值中提取月份。
   ```sql
   SELECT MONTH('2023-08-27');
   ```

8. `DAY()`：从日期或日期时间值中提取日。
   ```sql
   SELECT DAY('2023-08-27');
   ```

9. `HOUR()`：从时间或日期时间值中提取小时。
   ```sql
   SELECT HOUR('15:30:45');
   ```

10. `MINUTE()`：从时间或日期时间值中提取分钟。
    ```sql
    SELECT MINUTE('15:30:45');
    ```

11. `SECOND()`：从时间或日期时间值中提取秒。
    ```sql
    SELECT SECOND('15:30:45');
    ```

这只是一些常见的 MySQL 时间日期函数示例，还有许多其他函数可用于处理时间和日期。你可以根据具体需求选择合适的函数来进行操作。

### 15. 函数-字符串处理✔✔

在 SQL 中，字符串处理是一类用于处理文本数据的函数。它们允许我们对字符串进行各种操作，如转换大小写【`UPPER(字段属性)、LOWER(字段属性)`】、计算字符串长度`LENGTH(属性字段)`以及搜索和替换子字符串等。字符串处理函数可以帮助我们在数据库中对字符串进行加工和转换，从而满足不同的需求。

eg：假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）。请你编写一个 SQL 查询，筛选出姓名为 '热dog' 的学生，展示其学号（id）、姓名（name）及其大写姓名（upper_name）。

```sql
select
  id,
  name,
  upper(name) upper_name
from
  student
where
  name = '热dog';
```

当您使用SQL查询时，您可以使用不同的函数来搜索和替换字符串。以下是对这些函数的一些详细解释：

1. LIKE运算符：

   - LIKE运算符用于在查询中进行模糊匹配。它可以与通配符一起使用，例如%和_。
   - %表示匹配任意字符的任意长度序列，例如'abc%'将匹配以"abc"开头的任意长度的字符串。
   - _表示匹配任意单个字符，例如'a__c'将匹配以"a"开头，以"c"结尾的任意两个字符的字符串。
   - 例如，以下查询将返回包含特定模式的所有行：

   ```sql
   SELECT * FROM table_name WHERE column_name LIKE '%pattern%';
   ```

   这将匹配包含"pattern"子字符串的任何位置的行。

2. **CONTAINS函数**：

   - CONTAINS函数用于在一个字符串列中搜索另一个字符串。它返回一个逻辑值，如果搜索字符串在列中存在，则返回TRUE，否则返回FALSE。
   - 例如，以下查询将返回包含特定字符串的所有行：

   ```sql
   SELECT * FROM table_name WHERE CONTAINS(column_name, 'search_string');
   ```

   这将搜索"column_name"列中是否存在"search_string"，如果存在，返回TRUE，否则返回FALSE。

3. **REPLACE函数**：

   - REPLACE函数用于在一个字符串中替换指定的子字符串为另一个字符串。
   - 例如，以下查询将把特定字符串替换为新的字符串：

   ```sql
   UPDATE table_name SET column_name = REPLACE(column_name, 'old_string', 'new_string');
   ```

   这将把"column_name"列中的"old_string"替换为"new_string"。

这些函数提供了在SQL中搜索和替换字符串的不同方式，可以根据您的需求选择适合的函数来执行相应的操作。请注意，具体的语法和函数名称可能会因使用的数据库系统而有所不同。

### 16. 函数-聚合函数

常见的聚合函数包括：

- COUNT：计算指定列的行数或非空值的数量。
- SUM：计算指定列的数值之和。
- AVG：计算指定列的数值平均值。
- MAX：找出指定列的最大值。
- MIN：找出指定列的最小值。



### 17. 分组聚合-单字段分组

在 SQL 中，通常使用 `GROUP BY` 关键字对数据进行分组。

eg：假设有一个学生表 student，包含以下字段：id（学号）、name（姓名）、class_id（班级编号）、score（成绩）。请你编写一个 SQL 查询，统计学生表中的班级编号（class_id）和每个班级的平均成绩（avg_score）。

```sql
select
  class_id,
  avg(score) avg_score
from
  student
group by
  class_id;
```

### 18.分组聚合-多字段分组✔

多字段分组和单字段分组的实现方式几乎一致，使用 `GROUP BY` 语法即可。

eg：假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`class_id`（班级编号）、`exam_num`（考试次数）、`score`（成绩）。请你编写一个 SQL 查询，统计学生表中每个班级每次考试的总学生人数（total_num）。

```sql
select
  class_id,
  exam_num,
  count(*) total_num
from
  student
group by
  class_id,
  exam_num;
```

> **注意**
>
> 在数据库查询中，COUNT(id)和COUNT(*)有显著的区别。
>
> COUNT(id)用于计算特定列（在这种情况下是id）的非空值的数量。这意味着，它将计算具有非空id值的行数，但不会计算NULL值。
>
> 另一方面，COUNT(*)是对所有列的统计，将计算所有行的数量，无论它们是否包含NULL值。换句话说，如果表中的某一行有一个NULL值，那么该行也会被计算在内。
>
> 总结来说，COUNT(id)和COUNT(*)的主要区别在于COUNT(id)不会将NULL值计入统计，而COUNT(*)会将NULL值计入统计。

### 19.分组聚合 - having 子句

HAVING 子句与条件查询 WHERE 子句的区别在于，WHERE 子句用于在 **分组之前** 进行过滤，而 HAVING 子句用于在 **分组之后** 进行过滤。（使用聚合函数需要having子句）

eg：假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`class_id`（班级编号）、`score`（成绩）。请你编写一个 SQL 查询，统计学生表中班级的总成绩超过 150 分的班级编号（class_id）和总成绩（total_score）。

```sql
select
  class_id,
  sum(score) total_score
from
  student
group by
  class_id
having
  sum(score) > 150;
```

### 20.查询进阶 - 关联查询 - cross join✔✔

其中，`CROSS JOIN` 是一种简单的关联查询，不需要任何条件来匹配行，它直接将左表的 **每一行** 与右表的 **每一行** 进行组合，返回的结果是两个表的笛卡尔积。（结果集行数是A表行数 x B表行数）

eg：假设有一个学生表 `student` ，包含以下字段：id（学号）、name（姓名）、age（年龄）、class_id（班级编号）；还有一个班级表 `class` ，包含以下字段：id（班级编号）、name（班级名称）。

请你编写一个 SQL 查询，将学生表和班级表的所有行组合在一起，并返回学生姓名（student_name）、学生年龄（student_age）、班级编号（class_id）以及班级名称（class_name）。

```sql
select
  s.name student_name,
  s.age student_age,
  s.class_id class_id,
  c.name class_name
from
  student s
  cross join class c;
```

### 21.查询进阶-关联查询-inner join

注意，INNER JOIN 只返回两个表中满足关联条件的交集部分，即在两个表中都存在的匹配行。（JOIN 默认 指 INNER JOIN）

eg：假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`age`（年龄）、`class_id`（班级编号）。还有一个班级表 `class`，包含以下字段：`id`（班级编号）、`name`（班级名称）、`level`（班级级别）。

请你编写一个 SQL 查询，根据学生表和班级表之间的班级编号进行匹配，返回学生姓名（`student_name`）、学生年龄（`student_age`）、班级编号（`class_id`）、班级名称（`class_name`）、班级级别（`class_level`）。

```sql
select
  s.name student_name,
  s.age student_age,
  s.class_id class_id,
  c.name class_name,
  c.level class_level
from
  student s
  inner join class c on s.class_id = c.id;
```

### 22.查询进阶 - 关联查询 - outer join✔

在 SQL 中，OUTER JOIN 是一种关联查询方式，它根据指定的关联条件，将两个表中满足条件的行组合在一起，并 **包含没有匹配的行** 。

在 OUTER JOIN 中，**包括 LEFT OUTER JOIN 和 RIGHT OUTER JOIN 两种类型，它们分别表示查询左表和右表的所有行（即使没有被匹配），再加上满足条件的交集部分**。

eg：假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`age`（年龄）、`class_id`（班级编号）。还有一个班级表 `class`，包含以下字段：`id`（班级编号）、`name`（班级名称）、`level`（班级级别）。

请你编写一个 SQL 查询，根据学生表和班级表之间的班级编号进行匹配，返回学生姓名（`student_name`）、学生年龄（`student_age`）、班级编号（`class_id`）、班级名称（`class_name`）、班级级别（`class_level`），要求必须返回所有学生的信息（即使对应的班级编号不存在）。

```sql
select
  s.name student_name,
  s.age student_age,
  s.class_id class_id,
  c.name class_name,
  c.level class_level
from
  student s
  left join class c on s.class_id = c.id;
```

### 23.查询进阶 - 子查询✔

子查询是指在一个查询语句内部 **嵌套** 另一个完整的查询语句，内层查询被称为子查询。子查询可以用于获取更复杂的查询结果或者用于过滤数据。

eg：假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`age`（年龄）、`score`（分数）、`class_id`（班级编号）。还有一个班级表 `class`，包含以下字段：`id`（班级编号）、`name`（班级名称）。

请你编写一个 SQL 查询，使用子查询的方式来获取存在对应班级的学生的所有数据，返回学生姓名（`name`）、分数（`score`）、班级编号（`class_id`）字段。

```sql
select
  name,
  score,
  class_id
from
  student
where
  class_id in (
    select
      id
    from
      class
  );
```

### 24.查询进阶 - 子查询 - exists ✔✔

其中，子查询中的一种特殊类型是 "exists" 子查询，用于检查主查询的结果集是否存在满足条件的记录，它返回布尔值（True 或 False），而不返回实际的数据。

eg：假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`age`（年龄）、`score`（分数）、`class_id`（班级编号）。还有一个班级表 `class`，包含以下字段：`id`（班级编号）、`name`（班级名称）。

请你编写一个 SQL 查询，使用 exists 子查询的方式来获取 **不存在对应班级的** 学生的所有数据，返回学生姓名（`name`）、年龄（`age`）、班级编号（`class_id`）字段。

```sql
select
  name,
  age,
  class_id
from
  student
where
  not exists (
    select
      class_id #无所谓
    from
      class
    where
      class.id = student.class_id #关键
  );
```

### 25.查询进阶 - 组合查询✔

包括两种常见的组合查询操作：UNION 和 UNION ALL。

1. UNION 操作：它用于将两个或多个查询的结果集合并， **并去除重复的行** 。即如果两个查询的结果有相同的行，则只保留一行。
2. UNION ALL 操作：它也用于将两个或多个查询的结果集合并， **但不去除重复的行** 。即如果两个查询的结果有相同的行，则全部保留。

eg：假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`age`（年龄）、`score`（分数）、`class_id`（班级编号）。还有一个新学生表 `student_new`，包含的字段和学生表完全一致。

请编写一条 SQL 语句，获取所有学生表和新学生表的学生姓名（`name`）、年龄（`age`）、分数（`score`）、班级编号（`class_id`）字段，要求保留重复的学生记录。

```sql
select
  name,
  age,
  score,
  class_id
from
  student
union all
select
  name,
  age,
  score,
  class_id
from
  student_new;
```

### 26.查询进阶 - 开窗函数 - sum over✔✔

在 SQL 中，开窗函数是一种强大的查询工具，它允许我们在查询中进行对分组数据进行计算、 **同时保留原始行的详细信息** 。

开窗函数可以与聚合函数（如 SUM、AVG、COUNT 等）结合使用，但与普通聚合函数不同，开窗函数不会导致结果集的行数减少。

该函数用法为：

```sql
SUM(计算字段名) OVER (PARTITION BY 分组字段名)
```

eg：假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`age`（年龄）、`score`（分数）、`class_id`（班级编号）。

请你编写一个 SQL 查询，返回**每个学生的详细信息**（字段顺序和原始表的字段顺序一致），并计算每个班级的学生平均分（class_avg_score）。

```sql
select
  id,
  name,
  age,
  score,
  class_id,
  avg(score) over (
    partition by
      class_id
  ) class_avg_score
from
  student;
 
#每个班
#select 
#id,name,age,score,class_id,avg(score) class_avg(score)
#from student
#group by class_id;
```



### 27.查询进阶 - 开窗函数 - sum over order by✔✔

sum over order by，可以实现同组内数据的 **累加求和** 。示例用法如下：

```sql
SUM(计算字段名) OVER (PARTITION BY 分组字段名 ORDER BY 排序字段 排序规则)
```

举一个应用场景：老师在每个班级里依次点名，每点到一个学生，老师都会记录当前已点到的学生们的分数总和。

eg：假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`age`（年龄）、`score`（分数）、`class_id`（班级编号）。

请你编写一个 SQL 查询，返回每个学生的详细信息（字段顺序和原始表的字段顺序一致），并且按照分数升序的方式**累加计算**每个班级的学生总分（class_sum_score）。

```sql
select
  id,
  name,
  age,
  score,
  class_id,
  sum(score) over ( #注意字段
    partition by
      class_id
    order by
      score asc  #注意字段
  ) class_sum_score
from
  student;
```

### 28.查询进阶 - 开窗函数 - rank✔✔

`RANK()`函数会为相同数值的行分配相同的排名，并跳过下一个排名。`ROW_NUMBER()`函数则会为每一行分配唯一的行号。

Rank 开窗函数的常见用法是在查询结果中查找前几名（Top N）或排名最高的行。

Rank 开窗函数的语法如下：

```sql
RANK() OVER (
  PARTITION BY 列名1, 列名2, ... -- 可选，用于指定分组列
  ORDER BY 列名3 [ASC|DESC], 列名4 [ASC|DESC], ... -- 用于指定排序列及排序方式
) AS rank_column
```

其中，`PARTITION BY` 子句可选，用于指定分组列，将结果集按照指定列进行分组；`ORDER BY` 子句用于指定排序列及排序方式，决定了计算 Rank 时的排序规则。`AS rank_column` 用于指定生成的 Rank 排名列的别名。

eg：假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`age`（年龄）、`score`（分数）、`class_id`（班级编号）。

请你编写一个 SQL 查询，返回每个学生的详细信息（字段顺序和原始表的字段顺序一致），并且按照分数降序的方式计算每个班级内的学生的分数排名（ranking）。

```sql
select
  id,
  name,
  age,
  score,
  class_id,
  rank() over (
    partition by
      class_id
    order by
      score desc
  ) ranking
from
  student;
```

### 29.查询进阶 - 开窗函数-row_number✔✔

`RANK()`函数会为相同数值的行分配相同的排名，并跳过下一个排名。`ROW_NUMBER()`函数则会为每一行分配唯一的行号。

Row_Number 开窗函数是 SQL 中的一种用于为查询结果集中的每一行 **分配唯一连续排名** 的开窗函数。

Row_Number 开窗函数的语法如下（几乎和 Rank 函数一模一样）：

```sql
ROW_NUMBER() OVER (
  PARTITION BY column1, column2, ... -- 可选，用于指定分组列
  ORDER BY column3 [ASC|DESC], column4 [ASC|DESC], ... -- 用于指定排序列及排序方式
) AS row_number_column
```

其中，`PARTITION BY`子句可选，用于指定分组列，将结果集按照指定列进行分组。`ORDER BY` 子句用于指定排序列及排序方式，决定了计算 Row_Number 时的排序规则。`AS row_number_column` 用于指定生成的行号列的别名。

> 对于具有相同值的行，`RANK()` 函数将为它们分配相同的排名，并跳过下一个排名。例如，在以下数据集中：
>
> ```
> +------+------+-------+
> | Name | Exam | Score |
> +------+------+-------+
> | Amy  |   1  |   95  |
> | Bob  |   1  |   90  |
> | John |   2  |   85  |
> | Kate |   2  |   85  |
> +------+------+-------+
> ```
>
> 使用 `RANK()` 函数：
>
> ```
> sqlCopy CodeSELECT Name, Exam, Score, RANK() OVER (PARTITION BY Exam ORDER BY Score DESC) AS Rank
> FROM scores;
> ```
>
> 结果：
>
> ```
> +------+------+-------+------+
> | Name | Exam | Score | Rank |
> +------+------+-------+------+
> | Amy  |   1  |   95  |  1   |
> | Bob  |   1  |   90  |  2   |
> | John |   2  |   85  |  1   |
> | Kate |   2  |   85  |  1   |
> +------+------+-------+------+
> ```
>
> 在这里，John 和 Kate 的成绩相同，它们被分配了相同的排名 1，并且下一个排名是 2。
>
> 对于 `ROW_NUMBER()` 函数，它将为每一行分配唯一的行号，即使存在相同值的行。所以结果是：
>
> ```
> +------+------+-------+-----------+
> | Name | Exam | Score | RowNumber |
> +------+------+-------+-----------+
> | Amy  |   1  |   95  |     1     |
> | Bob  |   1  |   90  |     2     |
> | John |   2  |   85  |     3     |
> | Kate |   2  |   85  |     4     |
> +------+------+-------+-----------+
> ```
>
> 因此，在具有相同值的行的情况下，`RANK()` 函数和 `ROW_NUMBER()` 函数将会有不同的结果。感谢您的指正，我非常抱歉给您带来了混淆。

### 30.查询进阶 - 开窗函数 - lag / lead✔

开窗函数 Lag 和 Lead 的作用是获取在当前行之前或之后的行的值，这两个函数通常在需要比较相邻行数据或进行时间序列分析时非常有用。

1）Lag 函数

Lag 函数用于获取 **当前行之前** 的某一列的值。它可以帮助我们查看上一行的数据。

Lag 函数的语法如下：

```sql
LAG(column_name, offset, default_value) OVER (PARTITION BY partition_column ORDER BY sort_column)
```

参数解释：

- `column_name`：要获取值的列名。
- `offset`：表示要向上偏移的行数。例如，offset为1表示获取上一行的值，offset为2表示获取上两行的值，以此类推。
- `default_value`：可选参数，用于指定当没有前一行时的默认值。
- `PARTITION BY`和`ORDER BY`子句可选，用于分组和排序数据。

2）Lead 函数

Lead 函数用于获取 **当前行之后** 的某一列的值。它可以帮助我们查看下一行的数据。

Lead 函数的语法如下：

```sql
LEAD(column_name, offset, default_value) OVER (PARTITION BY partition_column ORDER BY sort_column)
```

参数解释：

- `column_name`：要获取值的列名。
- `offset`：表示要向下偏移的行数。例如，offset为1表示获取下一行的值，offset为2表示获取下两行的值，以此类推。
- `default_value`：可选参数，用于指定当没有后一行时的默认值。
- `PARTITION BY`和`ORDER BY`子句可选，用于分组和排序数据。

eg：假设有一个学生表 `student`，包含以下字段：`id`（学号）、`name`（姓名）、`age`（年龄）、`score`（分数）、`class_id`（班级编号）。

请你编写一个 SQL 查询，返回每个学生的详细信息（字段顺序和原始表的字段顺序一致），并且按照分数降序的方式获取每个班级内的学生的前一名学生姓名（prev_name）、后一名学生姓名（next_name）。

```sql
select
  id,
  name,
  age,
  score,
  class_id,
  lag(name, 1, null) over (
    partition by
      class_id
    order by
      score desc
  ) prev_name,
  lead(name, 1, null) over (
    partition by
      class_id
    order by
      score desc
  ) next_name
from
  student;
```



### 31.补充题目

1、假设有一家冒险者公会，他们有一张名为 `rewards` 的表格，用于记录每个冒险者在各个任务中获得的金币奖励情况。

表格字段如下：

- `adventurer_id`：冒险者ID，唯一标识每个冒险者。
- `adventurer_name`：冒险者姓名。
- `task_id`：任务ID，唯一标识每个任务。
- `task_name`：任务名称。
- `reward_coins`：冒险者在该任务中获得的金币奖励数量。

请你编写一条 SQL 查询语句，依次输出每个冒险者的 id（`adventurer_id`）、冒险者姓名（`adventurer_name`）、获得的总金币奖励（`total_reward_coins`），并按照总金币奖励从高到低排序，其中只列出总金币奖励排名前 3 的冒险者。

```sql
select
  adventurer_id,
  adventurer_name,
  sum(reward_coins) total_reward_coins
from
  rewards
group by
  adventurer_id,
  adventurer_name
order by
  total_reward_coins desc
limit
  0, 3;
```

2、假设有一家魔法学院，里面有许多学员在不同科目上进行学习和考试。请你设计一张名为`magic_scores`的表格，用于记录每位学员在不同科目中的考试成绩情况。表格字段如下：

- `student_id`：学员ID，唯一标识每位学员。
- `student_name`：学员姓名。
- `subject_id`：科目ID，唯一标识每个科目。
- `subject_name`：科目名称。
- `score`：学员在该科目的考试成绩。

请你编写一条 SQL 查询语句，依次输出每位学员的学院 ID（`student_id`）、学员姓名（`student_name`）、科目 ID（`subject_id`）、科目名称（`subject_name`）、学员在该科目的考试成绩（`score`）、该学员在每个科目中的成绩排名（`score_rank`），并将结果按照成绩从高到低进行排序。

```sql
select
  student_id,
  student_name,
  subject_id,
  subject_name,
  score,
  rank() over (
    partition by
      subject_id
    order by
      score desc
  ) score_rank
from
  magic_scores;
```

3、在神秘的海岛上，有一只传说中的大浪淘鸡，它身躯高大威武，羽毛闪烁着神秘的光芒。岛上的居民都传说大浪淘鸡是海洋之神的化身，它能够操纵海浪，带来平静或狂暴的海洋。为了验证这个传说是否属实，岛上的居民决定对大浪淘鸡进行观测和记录。

有一张 `chicken_observation` 的表格，用于记录居民观测大浪淘鸡的信息。表格字段如下：

- `observation_id`：观测记录ID，唯一标识每条观测记录
- `observer_name`：观测者姓名
- `observation_date`：观测日期
- `observation_location`：观测地点
- `wave_intensity`：观测到的海浪强度，用整数表示，数值越大，海浪越狂暴

请你编写一条 SQL 查询语句，找出观测地点包含 "大浪淘鸡" 且海浪强度超过 5 的观测记录，并依次输出每位观测者的姓名（`observer_name`）、观测日期（`observation_date`）以及观测到的海浪强度（`wave_intensity`）。

```sql
select
  observer_name,
  observation_date,
  wave_intensity
from
  chicken_observation
where
  observation_location like '%大浪淘鸡%'
  and wave_intensity > 5;
```

