# MySQL-Exe

注意：**select、from、where、group by、having、order by、limit**

**学生表** Student(SId,Sname,Sage,Ssex)–SId 学生编号,Sname 学生姓名,Sage 出生年月,Ssex 学生性别

```sql
CREATE TABLE Student (
    SId VARCHAR ( 10 ),
    Sname VARCHAR ( 10 ),
    Sage datetime,
    Ssex VARCHAR ( 10 )
);

insert into Student values('01' , '赵雷' , '1990-01-01' , '男');
insert into Student values('02' , '钱电' , '1990-12-21' , '男');
insert into Student values('03' , '孙风' , '1990-05-20' , '男');
insert into Student values('04' , '李云' , '1990-08-06' , '男');
insert into Student values('05' , '周梅' , '1991-12-01' , '女');
insert into Student values('06' , '吴兰' , '1992-03-01' , '女');
insert into Student values('07' , '郑竹' , '1989-07-01' , '女');
insert into Student values('09' , '张三' , '2017-12-20' , '女');
insert into Student values('10' , '李四' , '2017-12-25' , '女');
insert into Student values('11' , '李四' , '2017-12-30' , '女');
insert into Student values('12' , '赵六' , '2017-01-01' , '女');
insert into Student values('13' , '孙七' , '2018-01-01' , '女');
```

**课程表** Course(CId,Cname,TId) – CId 课程编号,Cname 课程名称,TId 教师编号

```sql
CREATE TABLE Course (
    CId VARCHAR ( 10 ),
    Cname nvarchar ( 10 ),
    TId VARCHAR ( 10 ));
    
INSERT INTO Course VALUES( '01', '语文', '02' );
insert into Course values('02' , '数学' , '01');
insert into Course values('03' , '英语' , '03');
```

**教师表** Teacher(TId,Tname)–TId 教师编号,Tname 教师姓名

```sql
CREATE TABLE Teacher (
    TId VARCHAR ( 10 ),
    Tname VARCHAR ( 10 ));

insert into Teacher values('01' , '张三');
insert into Teacher values('02' , '李四');
insert into Teacher values('03' , '王五');
```

**成绩表** SC(SId,CId,score)–SId 学生编号,CId 课程编号,score 分数

```sql
CREATE TABLE SC (
    SId VARCHAR ( 10 ),
    CId VARCHAR ( 10 ),
    score DECIMAL ( 18, 1 ));

insert into SC values('01' , '01' , 80);
insert into SC values('01' , '02' , 90);
insert into SC values('01' , '03' , 99);
insert into SC values('02' , '01' , 70);
insert into SC values('02' , '02' , 60);
insert into SC values('02' , '03' , 80);
insert into SC values('03' , '01' , 80);
insert into SC values('03' , '02' , 80);
insert into SC values('03' , '03' , 80);
insert into SC values('04' , '01' , 50);
insert into SC values('04' , '02' , 30);
insert into SC values('04' , '03' , 20);
insert into SC values('05' , '01' , 76);
insert into SC values('05' , '02' , 87);
insert into SC values('06' , '01' , 31);
insert into SC values('06' , '03' , 34);
insert into SC values('07' , '02' , 89);
insert into SC values('07' , '03' , 98);
```

## 1. 查询" 01 “课程比” 02 “课程成绩高的学生的信息及课程分数

```sql
SELECT 
	sc1.sid,stu.Sname,sc1.cid,sc1.score sc1_score,sc2.score sc2_score
FROM sc sc1 
join sc sc2 on sc1.SId = sc2.SId 
join student stu on sc2.sid = stu.SId 
WHERE sc1.CId = '01' 
	and sc2.cid = '02' 
	and sc1.score > sc2.score;

SELECT 
	sc1.sid,stu.Sname,sc1.cid,sc1.score sc1_score,sc2.score sc2_score
FROM (select * from sc WHERE CId = '01') sc1
join (select * from sc WHERE CId = '02') sc2 on sc1.sid = sc2.sid
join student stu on sc2.sid = stu.SId 
where sc1.score > sc2.score;
```

这两个查询的结果相同，但是第二个查询更加高效。原因如下：

第一个查询使用了三个表的连接操作，这样会导致计算量增加，效率较低。而第二个查询采用了子查询，将原始数据进行筛选后再进行连接，减少了计算量，效率更高。

此外，第二个查询还使用了on关键字来连接两个表，而不是在where子句中进行条件限制。这种方式更加规范，也更容易阅读和理解。

总之，应该尽可能地避免多表连接操作，尤其是当数据量较大时。在必要时，可以使用子查询或者其他方法来优化查询效率。

## 2. 查询同时存在” 01 “课程和” 02 “课程的情况✏️

```sql
SELECT
	r1.*,
	r2.cid 
FROM
	( SELECT * FROM sc WHERE cid = '01' ) r1
	JOIN ( SELECT * FROM sc WHERE cid = '02' ) r2 ON r1.sid = r2.sid;
```

## 3. 查询存在” 01 “课程但可能不存在” 02 “课程的情况(不存在时显示为 null )

```sql
SELECT
	* 
FROM
	( SELECT * FROM sc WHERE cid = '01' ) r1
	LEFT JOIN ( SELECT * FROM sc WHERE cid = '02' ) r2 ON r1.sid = r2.sid;
```

## 4. 查询平均成绩大于等于 60 分的同学的学生编号和学生姓名和平均成绩√

```sql
SELECT
	student.sid,
	student.Sname,
	sc2.score 
FROM
	student
	JOIN (
        SELECT
        sc.sid,
        avg( sc.score ) score 
        FROM
        sc 
        GROUP BY
        sc.SId 
        HAVING
        avg( sc.score ) >= 60 
    ) sc2 ON student.SId = sc2.SId;
-- 
SELECT
	sc.sid,
	stu.Sname,
	avg( sc.score ) 
FROM
	sc
	JOIN student stu ON sc.sid = stu.sid 
GROUP BY
	sc.SId,
	stu.Sname 
HAVING
	avg( sc.score ) >= 60;
```

## 5. 查询在 SC 表存在成绩的学生信息
```sql
SELECT * FROM sc WHERE sc.score >= 0;
```

## 6. 查询所有同学的学生编号、学生姓名、选课总数、所有课程的总成绩(没成绩的显示为 null )
```sql
SELECT
	student.sid,
	student.Sname,
	count(sc.cid),
	sum( sc.score ) 
FROM
	student
	LEFT JOIN sc ON student.SId = sc.SId 
GROUP BY
	student.sid,student.Sname;
```

## 7.查有成绩的学生信息✏️
```sql
SELECT
	*
FROM
	student
WHERE
	sid IN (SELECT sid FROM sc);
```

## 8.查询「李」姓老师的数量

```sql
SELECT count(TId) FROM teacher WHERE Tname LIKE '李%';
```

## 9.查询学过「张三」老师授课的同学的信息
```sql
SELECT
	student.* 
FROM
	student
	JOIN sc ON student.SId = sc.SId
	JOIN course ON sc.CId = course.CId
	JOIN teacher ON course.TId = teacher.TId 
WHERE
	teacher.Tname = '张三';
```

## 10.查询没有学全所有课程的同学的信息
```sql
SELECT
	stu.SId,
	stu.Sname 
FROM
	course cou
	JOIN sc ON cou.cid = sc.cid
	RIGHT JOIN student stu ON sc.sid = stu.sid 
GROUP BY
	stu.SId,
	stu.Sname 
HAVING
	count( sc.CId ) != ( SELECT count(*) FROM course );
```

## 11.查询至少有一门课与学号为" 01 "的同学所学相同的同学的信息
```sql
SELECT
	DISTINCT student.*
FROM
	student
	JOIN sc ON student.SId = sc.sid 
WHERE
	sc.cid IN ( SELECT CId FROM sc WHERE sc.SId = '01' );
```

## 12.查询和" 01 "号的同学学习的课程完全相同的==其他==同学的信息
```sql
SELECT
	sc.SId,
	student.Sname,
	count( sc.CId ) cid_count 
FROM
	student
	JOIN sc ON student.SId = sc.sid 
WHERE
	sc.cid IN ( SELECT CId FROM sc WHERE sc.SId = '01' ) 
	AND sc.sid != '01' 
GROUP BY
	sc.SId,
	student.Sname 
HAVING
	cid_count = ( SELECT count( cid ) FROM sc WHERE sc.SId = '01' );
```

## 13.查询没学过"张三"老师讲授的任一门课程的学生姓名

```sql
SELECT DISTINCT
	student.Sname 
FROM
	student 
WHERE
	SId NOT IN (
	SELECT
		sc.SId 
	FROM
		teacher
		JOIN course ON teacher.TId = course.TId
		JOIN sc ON course.CId = sc.CId 
	WHERE
		teacher.Tname = '张三' 
	);
```

## 14.查询两门及其以上不及格课程的同学的学号，姓名及其平均成绩

```sql
SELECT
	student.SId,
	student.Sname,
	avg( sc2.score )
FROM
	( SELECT sc.SId, sc.score, sc.CId FROM sc WHERE sc.score < 60 ) sc2
	JOIN student ON sc2.SId = student.SId 
GROUP BY
	sc2.SId,
	student.Sname 
HAVING
	count( sc2.score ) >= 2;
```

## 15. 检索" 01 "课程分数小于 60，按分数降序排列的学生信息
```sql
SELECT
	student.*,
	sc.score 
FROM
	sc
	JOIN student ON sc.SId = student.SId 
WHERE
	sc.CId = '01' 
	AND sc.score < 60 
ORDER BY
	sc.score DESC;
```

## 16. 按平均成绩从高到低显示所有学生的所有课程的成绩以及平均成绩✏️
```sql
SELECT
	sc.sid,
	t1.avg_score,
	sc.cid,
	sc.score 
FROM
	sc
LEFT JOIN (
	SELECT sid, avg( score ) AS avg_score, cid, score 
	FROM sc GROUP BY sid, cid, score
) t1 ON sc.sid = t1.sid
ORDER BY
	2 DESC;
```

## 17. 查询各科成绩最高分、最低分和平均分
```sql
SELECT
	sc.CId,
	course.Cname,
	max( sc.score ),
	min( sc.score ),
	avg( sc.score ) 
FROM
	sc
	JOIN course ON sc.CId = course.CId 
GROUP BY
	sc.CId,
	course.Cname;
```

## 18. 以如下形式显示：课程 ID，课程 name，最高分，最低分，平均分，及格率，中等率，优良率，优秀率 及格为>=60，中等为：70-80，优良为：80-90，优秀为：>=90 要求输出课程号和选修人数，查询结果按人数降序排列，若人数相同，按课程号升序排列 ✏️

```sql

SELECT
	sc.cid,
	course.Cname,
	max( sc.score ),
	min( sc.score ),
	avg( sc.score ),
	sum( CASE WHEN sc.score >= 60 THEN 1 ELSE 0 END )* 1.0 / count( sc.score ) 及格,
	sum( CASE WHEN sc.score BETWEEN 70 AND 80 THEN 1 ELSE 0 END )* 1.0 / count( sc.score ) 中等,
	sum( CASE WHEN sc.score BETWEEN 80 AND 90 THEN 1 ELSE 0 END )* 1.0 / count( sc.score ) 优良,
	sum( CASE WHEN sc.score >= 90 THEN 1 ELSE 0 END )* 1.0 / count( sc.score ) 优秀 
FROM
	sc
	JOIN course ON sc.cid = course.CId 
GROUP BY
	sc.cid,
	course.Cname;
```

## 19. 按各科成绩进行排序，并显示排名， Score 重复时保留名次空缺

```sql
SELECT
	sc.SId,
	sc.CId,
	sc.score,
	rank () over ( ORDER BY sc.score DESC ) '次序' 
FROM
	sc;
```

## 20. 按各科成绩进行排序，并显示排名， Score 重复时合并名次

```sql
SELECT
	CId,
	score,
	dense_rank () over ( ORDER BY score DESC ) 
FROM
	sc;
```

## 21. 要求输出课程号和选修人数，查询结果按人数降序排列，若人数相同，按课程号升序排列

```sql
SELECT 
	sc.CId,
	count(sc.SId) sid_count
FROM sc
GROUP BY sc.CId
ORDER BY sid_count DESC,sc.CId ASC;
---
SELECT 
	sc.CId,
	count(sc.SId) sid_count
FROM sc
GROUP BY sc.CId
ORDER BY 2 DESC,1 ASC;
```

## 22. 查询学生的总成绩，并进行排名，总分重复时保留名次空缺

```sql
SELECT
	sc.sid,
	sum( sc.score ) sum_score,
	rank () over ( ORDER BY sum( sc.score ) DESC ) 
FROM
	sc 
GROUP BY
	sc.SId;
```

## 23. 查询学生的总成绩，并进行排名，总分重复时不保留名次空缺

```sql
SELECT
	sc.sid,
	sum( sc.score ) sum_score,
	row_number () over ( ORDER BY sum( sc.score ) DESC ) 
FROM
	sc 
GROUP BY
	sc.SId;
```

## 24. 统计各科成绩各分数段人数：课程编号，课程名称，[100-85]，[85-70]，[70-60]，[60-0] 及所占百分比✏️

```sql
SELECT
	cid,
	sum( CASE WHEN score BETWEEN 85 AND 100 THEN 1 ELSE 0 END )* 1.0 / count( sid ) '85-100',
	sum( CASE WHEN score BETWEEN 70 AND 85 THEN 1 ELSE 0 END )* 1.0 / count( sid ) '70-85',
	sum( CASE WHEN score BETWEEN 60 AND 70 THEN 1 ELSE 0 END )* 1.0 / count( sid ) '60-70',
	sum( CASE WHEN score BETWEEN 85 AND 100 THEN 1 ELSE 0 END )* 1.0 / count( sid ) '0-60' 
FROM
	sc 
GROUP BY
	cid;
```

## 25. 查询各科成绩前三名的记录✏️

```sql

SELECT
	* 
FROM
	( SELECT *, ROW_NUMBER () OVER ( PARTITION BY sc.CId ORDER BY sc.score DESC ) AS num FROM sc ) AS t1 
WHERE
	num <= 3;
```

## 26. 查询每门课程被选修的学生数

```sql
SELECT
	sc.CId,
	count( sc.SId ) 
FROM
	sc 
GROUP BY
	sc.CId;
```

## 27. 查询出只选修两门课程的学生学号和姓名

```sql
SELECT
	sc.SId,student.Sname 
FROM
	sc
	JOIN student ON sc.SId = student.SId 
GROUP BY
	sc.SId,
	student.Sname 
HAVING
	count( sc.CId ) = 2;
```

## 28. 查询男生、女生人数

```sql
SELECT
	student.Ssex,
	count(*) 
FROM
	student 
GROUP BY
	student.Ssex;
```

## 29. 查询名字中含有「风」字的学生信息

```sql
SELECT
	* 
FROM
	student 
WHERE
	student.Sname LIKE '%风%';
```

## 30. 查询同名同性学生名单，并统计同名人数✏️

```sql
select sname, count(*) from student
group by sname
having count(*)>1;
```

## 31. 查询 1990 年出生的学生名单

```sql
SELECT
	* 
FROM
	student 
WHERE
	student.Sage LIKE '1990%';

SELECT
	* 
FROM
	student 
WHERE
	sage BETWEEN '1990-01-01' 
	AND '1991-01-01'
```

## 32. 查询每门课程的平均成绩，结果按平均成绩降序排列，平均成绩相同时，按课程编号升序排列

```sql
SELECT
	sc.CId,
	avg( sc.score ) 
FROM
	sc 
GROUP BY
	sc.CId 
ORDER BY
	2 DESC, 1 ASC;
```

## 33. 查询平均成绩大于等于 85 的所有学生的学号、姓名和平均成绩

```sql
SELECT
	sc.SId,
	student.Sname,
	avg( sc.score ) avg_score
FROM
	sc 
	JOIN student
	ON sc.SId = student.SId
GROUP BY
	sc.SId,student.Sname
HAVING
	avg_score >= 85;
```

## 34. 查询课程名称为「数学」，且分数低于 60 的学生姓名和分数

```sql
SELECT
	student.Sname,sc.score
FROM
	sc
	JOIN course ON sc.CId = course.CId
	JOIN student ON sc.SId = student.SId 
WHERE
	course.Cname = '数学' 
	AND sc.score < 60;
```

## 35. 查询所有学生的课程及分数情况（存在学生没成绩，没选课的情况）

```sql
SELECT
	student.SId,student.Sname,course.CId,course.Cname,sc.score 
FROM
	student
	LEFT JOIN sc ON student.SId = sc.SId
	LEFT JOIN course ON sc.CId = course.CId;
```

## 36. 查询任何一门课程成绩在 70 分以上的姓名、课程名称和分数

```sql
SELECT DISTINCT
	sc.SId,
	student.Sname,
	course.Cname,
	sc.score 
FROM
	sc
	JOIN student ON sc.SId = student.SId
	JOIN course ON sc.CId = course.CId 
WHERE
	sc.score > 70;
```

## 37. 查询不及格的课程

```sql
SELECT DISTINCT
	sc.CId,
	course.Cname 
FROM
	sc
	JOIN course ON sc.CId = course.CId 
WHERE
	sc.score < 60;
```

## 38. 查询课程编号为 01 且课程成绩在 80 分以上的学生的学号和姓名

```sql
SELECT
	sc.SId,
	student.Sname,
	sc.score 
FROM
	sc
	JOIN student ON sc.SId = student.SId 
WHERE
	sc.CId = '01' 
	AND sc.score >= 80;
```

## 39. 求每门课程的学生人数

```sql
SELECT
	sc.CId,
	count( sc.SId ) 
FROM
	sc 
GROUP BY
	sc.CId;
```

## 40. 成绩不重复，查询选修「张三」老师所授课程的学生中，成绩最高的学生信息及其成绩

```sql
SELECT
	sc.SId,
	student.Sname,
	sc.score 
FROM
	teacher
	JOIN course ON teacher.TId = course.TId
	JOIN sc ON course.CId = sc.CId
	JOIN student ON sc.SId = student.SId 
WHERE
	teacher.Tname = '张三' 
ORDER BY
	3 DESC 
	LIMIT 0,1;
```

## 41. 成绩有重复的情况下，查询选修「张三」老师所授课程的学生中，成绩最高的学生信息及其成绩

```sql
SELECT
	sc.SId,
	student.Sname,
	sc.score 
FROM
	teacher
	JOIN course ON teacher.TId = course.TId
	JOIN sc ON course.CId = sc.CId
	JOIN student ON sc.SId = student.SId 
WHERE
	teacher.Tname = '张三' 
	AND sc.score = (
	SELECT
		MAX( score ) 
	FROM
		sc 
	WHERE
		CId IN ( SELECT CId FROM course WHERE TId = ( SELECT TId FROM teacher WHERE Tname = '张三' ) ) 
	);
```

## 42. 查询不同课程成绩相同的学生的学生编号、课程编号、学生成绩

```sql
SELECT
	sc1.SId,
	sc1.CId,
	sc2.CId,
	sc2.score 
FROM
	sc sc1
	JOIN sc sc2 ON sc1.SId = sc2.SId 
WHERE
	sc1.CId != sc2.CId 
	AND sc1.score = sc2.score;

SELECT
	sc.* 
FROM
	sc,
	(
	SELECT
		sid 
	FROM
		sc 
	GROUP BY
		sid 
	HAVING
	count( DISTINCT cid ) > count( DISTINCT score )) t1 
WHERE
	sc.sid = t1.sid
```

## 43. 查询每门功成绩最好的前两名✏️

```sql
SELECT
	a.sid,
	a.cid,
	a.score 
FROM
	sc a
	LEFT JOIN sc b ON a.cid = b.cid 
	AND a.score < b.score 
GROUP BY
	a.cid,
	a.sid,
	a.score 
HAVING
	count( b.cid )< 2 
ORDER BY

```

## 44. 统计每门课程的学生选修人数（超过 5 人的课程才统计）

```sql
SELECT 
	sc.CId, count( sc.SId ) 
FROM 
	sc 
GROUP BY 
	sc.CId 
HAVING 
	count( sc.SId ) > 5;
```

## 45. 检索至少选修两门课程的学生学号

```sql
SELECT sc.SId FROM sc GROUP BY SId HAVING COUNT( sc.CId ) >= 2;
```

## 46. 查询选修了全部课程的学生信息

```sql

SELECT
	sc.SId 
FROM
	sc 
GROUP BY
	sc.SId 
HAVING
	COUNT( sc.CId ) = ( SELECT count( DISTINCT course.CId ) FROM course );
```

## 47. 查询各学生的年龄，只按年份来算

```sql
SELECT
	student.SId,
	student.Sname,
	YEAR (
	CURDATE()) - YEAR ( Sage ) age
FROM
	student;
```

