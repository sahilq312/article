CREATE TABLE "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"link" text NOT NULL,
	"source" text NOT NULL,
	"image_url" text,
	"snippet" text,
	"category" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"onboarding" boolean DEFAULT false NOT NULL,
	"selected_categories" text[] NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
