CREATE TABLE public.post (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    title bpchar NOT NULL,
    message character varying NOT NULL,
    user_id uuid NOT NULL
);
CREATE TABLE public."user" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    name character varying,
    auth0_user_id bpchar
);
ALTER TABLE ONLY public.post
    ADD CONSTRAINT "Post_id_key" UNIQUE (id);
ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_auth0_user_id_key UNIQUE (auth0_user_id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;
