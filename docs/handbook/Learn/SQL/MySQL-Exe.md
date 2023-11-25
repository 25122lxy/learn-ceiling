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

## 按平均成绩从高到低显示所有学生的所有课程的成绩以及平均成绩✏️
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

