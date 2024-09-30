ALTER TABLE "messages" RENAME COLUMN "recipientId" TO "receiverId";--> statement-breakpoint
ALTER TABLE "messages" DROP CONSTRAINT "messages_recipientId_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_receiverId_users_id_fk" FOREIGN KEY ("receiverId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
