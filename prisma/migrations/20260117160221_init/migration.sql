-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'TEACHER', 'STUDENT');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('MUSIC', 'THEATER');

-- CreateEnum
CREATE TYPE "SeasonStatus" AS ENUM ('PLANNED', 'ACTIVE', 'CLOSED');

-- CreateEnum
CREATE TYPE "ClassStudentStatus" AS ENUM ('ACTIVE', 'TRANSFERRED', 'DROPPED');

-- CreateEnum
CREATE TYPE "ClassTeacherStatus" AS ENUM ('ACTIVE', 'REMOVED');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('ALBUM', 'PLAY');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED');

-- CreateEnum
CREATE TYPE "TrackSceneStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "StudentTrackStatus" AS ENUM ('LOCKED', 'AVAILABLE', 'STUDYING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "DailyMissionStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "StudentDailyMissionStatus" AS ENUM ('PENDING', 'DONE', 'DONE_WITH_PENALTY', 'SKIPPED');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('PENDING', 'REVIEWED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ReviewType" AS ENUM ('POSITIVE', 'CONSTRUCTIVE', 'CRITICAL');

-- CreateEnum
CREATE TYPE "PressResult" AS ENUM ('PASS', 'FAIL');

-- CreateEnum
CREATE TYPE "PressQuizStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "TourStatus" AS ENUM ('ACTIVE', 'PAUSED', 'BROKEN', 'FINISHED');

-- CreateEnum
CREATE TYPE "StreakDayStatus" AS ENUM ('DONE', 'MISSED', 'PAUSED');

-- CreateEnum
CREATE TYPE "ActorType" AS ENUM ('USER', 'SYSTEM', 'RULE_ENGINE');

-- CreateEnum
CREATE TYPE "TrackMaterialType" AS ENUM ('PDF', 'AUDIO', 'TEXT', 'LINK');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "status" "UserStatus" NOT NULL,
    "mustChangePassword" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProfile" (
    "userId" TEXT NOT NULL,
    "stageName" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "bio" TEXT,
    "currentCourseId" TEXT,
    "currentSeasonId" TEXT,
    "currentClassId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CourseType" NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "SeasonStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "maxStudents" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassStudent" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL,
    "leftAt" TIMESTAMP(3),
    "status" "ClassStudentStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassTeacher" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL,
    "leftAt" TIMESTAMP(3),
    "status" "ClassTeacherStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassTeacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTemplate" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ProjectType" NOT NULL,
    "description" TEXT,
    "version" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackSceneTemplate" (
    "id" TEXT NOT NULL,
    "projectTemplateId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "technicalInstruction" TEXT,
    "order" INTEGER NOT NULL,
    "unlockAfterTrackId" TEXT,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackSceneTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackMaterialTemplate" (
    "id" TEXT NOT NULL,
    "trackSceneTemplateId" TEXT NOT NULL,
    "type" "TrackMaterialType" NOT NULL,
    "title" TEXT NOT NULL,
    "defaultContentUrl" TEXT,
    "defaultTextContent" TEXT,
    "order" INTEGER NOT NULL,
    "isRequired" BOOLEAN NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackMaterialTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "projectTemplateId" TEXT NOT NULL,
    "projectTemplateVersion" INTEGER NOT NULL,
    "classId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL,
    "isVisible" BOOLEAN NOT NULL,
    "releasedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackScene" (
    "id" TEXT NOT NULL,
    "trackSceneTemplateId" TEXT NOT NULL,
    "trackSceneTemplateVersion" INTEGER NOT NULL,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "videoUrl" TEXT,
    "technicalInstruction" TEXT,
    "order" INTEGER NOT NULL,
    "status" "TrackSceneStatus" NOT NULL,
    "isVisible" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackScene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackMaterial" (
    "id" TEXT NOT NULL,
    "trackMaterialTemplateId" TEXT NOT NULL,
    "trackMaterialTemplateVersion" INTEGER NOT NULL,
    "trackSceneId" TEXT NOT NULL,
    "type" "TrackMaterialType" NOT NULL,
    "title" TEXT NOT NULL,
    "contentUrl" TEXT,
    "textContent" TEXT,
    "order" INTEGER NOT NULL,
    "isVisible" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentTrackScene" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "trackSceneId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "status" "StudentTrackStatus" NOT NULL,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentTrackScene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyMission" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "videoUrl" TEXT,
    "order" INTEGER NOT NULL,
    "status" "DailyMissionStatus" NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyMission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyMissionQuiz" (
    "id" TEXT NOT NULL,
    "dailyMissionId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "questionsJson" JSONB NOT NULL,
    "maxAttemptsPerDay" INTEGER NOT NULL,
    "allowRecoveryAttempt" BOOLEAN NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyMissionQuiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentDailyMission" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "dailyMissionId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "StudentDailyMissionStatus" NOT NULL,
    "quizId" TEXT,
    "attemptsCount" INTEGER NOT NULL,
    "answersJson" JSONB,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentDailyMission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "trackSceneId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "attemptNumber" INTEGER NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "status" "SubmissionStatus" NOT NULL,
    "pressUnlocked" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "type" "ReviewType" NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PressQuiz" (
    "id" TEXT NOT NULL,
    "trackSceneId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "questionsJson" JSONB NOT NULL,
    "maxAttempts" INTEGER NOT NULL,
    "passingScore" INTEGER NOT NULL,
    "status" "PressQuizStatus" NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PressQuiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PressAttempt" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "pressQuizId" TEXT NOT NULL,
    "attemptNumber" INTEGER NOT NULL,
    "answersJson" JSONB NOT NULL,
    "score" INTEGER NOT NULL,
    "result" "PressResult" NOT NULL,
    "headline" TEXT,
    "subtitle" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PressAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tour" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "status" "TourStatus" NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreakDay" (
    "id" TEXT NOT NULL,
    "tourId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "StreakDayStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StreakDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vacation" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vacation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "fans" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "currentStreak" INTEGER NOT NULL,
    "lastActiveDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FanTransaction" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FanTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DomainEvent" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "actorType" "ActorType" NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DomainEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ClassStudent_classId_studentId_key" ON "ClassStudent"("classId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "ClassTeacher_classId_teacherId_key" ON "ClassTeacher"("classId", "teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentTrackScene_studentId_trackSceneId_seasonId_key" ON "StudentTrackScene"("studentId", "trackSceneId", "seasonId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentDailyMission_studentId_dailyMissionId_date_key" ON "StudentDailyMission"("studentId", "dailyMissionId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Career_studentId_seasonId_key" ON "Career"("studentId", "seasonId");

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassStudent" ADD CONSTRAINT "ClassStudent_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassStudent" ADD CONSTRAINT "ClassStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassTeacher" ADD CONSTRAINT "ClassTeacher_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassTeacher" ADD CONSTRAINT "ClassTeacher_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTemplate" ADD CONSTRAINT "ProjectTemplate_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackSceneTemplate" ADD CONSTRAINT "TrackSceneTemplate_projectTemplateId_fkey" FOREIGN KEY ("projectTemplateId") REFERENCES "ProjectTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackMaterialTemplate" ADD CONSTRAINT "TrackMaterialTemplate_trackSceneTemplateId_fkey" FOREIGN KEY ("trackSceneTemplateId") REFERENCES "TrackSceneTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackScene" ADD CONSTRAINT "TrackScene_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackMaterial" ADD CONSTRAINT "TrackMaterial_trackSceneId_fkey" FOREIGN KEY ("trackSceneId") REFERENCES "TrackScene"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTrackScene" ADD CONSTRAINT "StudentTrackScene_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTrackScene" ADD CONSTRAINT "StudentTrackScene_trackSceneId_fkey" FOREIGN KEY ("trackSceneId") REFERENCES "TrackScene"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentDailyMission" ADD CONSTRAINT "StudentDailyMission_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PressAttempt" ADD CONSTRAINT "PressAttempt_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tour" ADD CONSTRAINT "Tour_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StreakDay" ADD CONSTRAINT "StreakDay_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacation" ADD CONSTRAINT "Vacation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FanTransaction" ADD CONSTRAINT "FanTransaction_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
