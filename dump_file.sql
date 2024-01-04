--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nickname character varying NOT NULL,
    user_id uuid
);


ALTER TABLE public.account OWNER TO postgres;

--
-- Name: account_conversation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_conversation (
    account_id uuid NOT NULL,
    conversation_id uuid NOT NULL
);


ALTER TABLE public.account_conversation OWNER TO postgres;

--
-- Name: account_direct; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_direct (
    account_id uuid NOT NULL,
    direct_id uuid NOT NULL
);


ALTER TABLE public.account_direct OWNER TO postgres;

--
-- Name: conversation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.conversation (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    creator_id uuid
);


ALTER TABLE public.conversation OWNER TO postgres;

--
-- Name: direct; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.direct (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.direct OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account (id, nickname, user_id) FROM stdin;
625cd25d-6652-4d6b-9b7b-313562752d3d	admin	b6fb2882-4c77-404c-b98b-864615e436cc
c4d0a7ae-359e-4031-8304-907bdc440176	Jackson	10d74998-b27f-44c3-92d3-6a1d6971bff5
afa41986-a596-44d5-a457-efe9cb1c0522	Emily	87a3b3d9-0967-45fb-b9c7-9a0db3d883d2
2feb95d5-7b57-45af-9247-12a0f69f26ab	Lucas	dc200c2b-0620-4021-88d2-02fd254a0e8e
8b2cd154-7d50-471e-93db-80bf14a7100f	Sophia	994909ce-0420-4e65-b2fd-748db4b7d5dc
\.


--
-- Data for Name: account_conversation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account_conversation (account_id, conversation_id) FROM stdin;
2feb95d5-7b57-45af-9247-12a0f69f26ab	191b5d91-2308-4946-9d6f-a9049690dfd5
8b2cd154-7d50-471e-93db-80bf14a7100f	7f1144b0-be03-4be1-a5d7-28fc44e0f719
8b2cd154-7d50-471e-93db-80bf14a7100f	191b5d91-2308-4946-9d6f-a9049690dfd5
\.


--
-- Data for Name: account_direct; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account_direct (account_id, direct_id) FROM stdin;
8b2cd154-7d50-471e-93db-80bf14a7100f	3f0ad57e-2575-473b-af82-3a1cf0722832
2feb95d5-7b57-45af-9247-12a0f69f26ab	3f0ad57e-2575-473b-af82-3a1cf0722832
\.


--
-- Data for Name: conversation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.conversation (id, title, "createdAt", "updatedAt", creator_id) FROM stdin;
191b5d91-2308-4946-9d6f-a9049690dfd5	LucasChat	2024-01-04 12:23:14.352837	2024-01-04 12:23:14.352837	2feb95d5-7b57-45af-9247-12a0f69f26ab
7f1144b0-be03-4be1-a5d7-28fc44e0f719	SophiaChat	2024-01-04 12:24:21.519413	2024-01-04 12:24:21.519413	8b2cd154-7d50-471e-93db-80bf14a7100f
\.


--
-- Data for Name: direct; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.direct (id, "createdAt", "updatedAt") FROM stdin;
3f0ad57e-2575-473b-af82-3a1cf0722832	2024-01-04 12:38:30.542951	2024-01-04 12:38:30.542951
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, email, password) FROM stdin;
b6fb2882-4c77-404c-b98b-864615e436cc	admin@gmail.com	$2b$10$Px8mmUHfpQKGlfvOM14V3u/ckNq8i3WQHYIbNI.pgsDJKY/08Kc9.
10d74998-b27f-44c3-92d3-6a1d6971bff5	Jackson@gmail.com	$2b$10$Mg7BM4iHu62OSO1dsCt4r.2D2eHt5JvnESDduWJWviyMKlumzpuRO
87a3b3d9-0967-45fb-b9c7-9a0db3d883d2	Emily@gmail.com	$2b$10$Xag3TujDN4UkEDIKNiLZz.peUW1p3hjScUAOo0yrzlSqRjjtfp9Ca
dc200c2b-0620-4021-88d2-02fd254a0e8e	Lucas@gmail.com	$2b$10$RN9/r8/QCSp2q/daL9cmvushRKA4r5Kq5eY4zCTqbF.3AoeRkt01u
994909ce-0420-4e65-b2fd-748db4b7d5dc	Sophia@gmail.com	$2b$10$x5B6Dui8tmmY10pM1N87g.fk43DB7./azz1TSO5iaWbBrSabyle.K
\.


--
-- Name: direct PK_08ae443c84556e83af5487f7cb8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.direct
    ADD CONSTRAINT "PK_08ae443c84556e83af5487f7cb8" PRIMARY KEY (id);


--
-- Name: account PK_54115ee388cdb6d86bb4bf5b2ea; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY (id);


--
-- Name: account_conversation PK_72995b2cfed6d28704f74889a20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_conversation
    ADD CONSTRAINT "PK_72995b2cfed6d28704f74889a20" PRIMARY KEY (account_id, conversation_id);


--
-- Name: account_direct PK_818e0378b60e0a7e4542f6a8e7c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_direct
    ADD CONSTRAINT "PK_818e0378b60e0a7e4542f6a8e7c" PRIMARY KEY (account_id, direct_id);


--
-- Name: conversation PK_864528ec4274360a40f66c29845; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversation
    ADD CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: account REL_efef1e5fdbe318a379c06678c5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT "REL_efef1e5fdbe318a379c06678c5" UNIQUE (user_id);


--
-- Name: conversation UQ_1b09741bc39a34524a227b73b1a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversation
    ADD CONSTRAINT "UQ_1b09741bc39a34524a227b73b1a" UNIQUE (title);


--
-- Name: account UQ_20fc404a1f1ab8cd9cccf6f6483; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT "UQ_20fc404a1f1ab8cd9cccf6f6483" UNIQUE (nickname);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: IDX_3591e0d943f45b758342a6ad49; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_3591e0d943f45b758342a6ad49" ON public.account_direct USING btree (account_id);


--
-- Name: IDX_793c23606b57cba90c8015e9e3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_793c23606b57cba90c8015e9e3" ON public.account_conversation USING btree (account_id);


--
-- Name: IDX_927fd38e914a9ae04df6ad351d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_927fd38e914a9ae04df6ad351d" ON public.account_conversation USING btree (conversation_id);


--
-- Name: IDX_f2e79acfe090ad9c0c48437f2f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_f2e79acfe090ad9c0c48437f2f" ON public.account_direct USING btree (direct_id);


--
-- Name: conversation FK_bf7659f325301df54aa401d93fc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversation
    ADD CONSTRAINT "FK_bf7659f325301df54aa401d93fc" FOREIGN KEY (creator_id) REFERENCES public.account(id);


--
-- Name: account FK_efef1e5fdbe318a379c06678c51; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT "FK_efef1e5fdbe318a379c06678c51" FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: account_conversation account_conversation_account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_conversation
    ADD CONSTRAINT account_conversation_account_id FOREIGN KEY (account_id) REFERENCES public.account(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: account_conversation account_conversation_conversation_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_conversation
    ADD CONSTRAINT account_conversation_conversation_id FOREIGN KEY (conversation_id) REFERENCES public.conversation(id);


--
-- Name: account_direct account_direct_account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_direct
    ADD CONSTRAINT account_direct_account_id FOREIGN KEY (account_id) REFERENCES public.account(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: account_direct account_direct_direct_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_direct
    ADD CONSTRAINT account_direct_direct_id FOREIGN KEY (direct_id) REFERENCES public.direct(id);


--
-- PostgreSQL database dump complete
--

