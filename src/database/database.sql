create database mariosalazar;

create table user_type(
    id_usertype serial not null,
    user_type_name varchar(50) not null,
    constraint pk_usertype primary key(id_usertype)
);

INSERT INTO user_type(user_type_name) VALUES('Common User');
INSERT INTO user_type(user_type_name) VALUES('Manager User');
INSERT INTO user_type(user_type_name) VALUES('Student User');

create table users(
    id_user serial not null,
    user_name varchar(50) not null unique,
    user_email varchar(50) not null unique,
    first_name varchar(60) not null,
    last_name varchar(60) not null,
    phone varchar(15) not null,
    address varchar(100) not null,
    user_state boolean not null,
    register_date date not null,
    password varchar(255) not null,
    user_delete boolean not null,
    user_type integer not null,
    constraint pk_users primary key(id_user),
    constraint fk_typeuser_users foreign key(user_type) references user_type(id_usertype)
);

INSERT INTO users (
    user_name, 
    user_email, 
    first_name, 
    last_name, 
    phone, 
    address, 
    user_state, 
    register_date, 
    password, 
    user_delete, 
    user_type
) VALUES (
    'nombreUsuario1',
    'correoUsuario1@example.com',
    'Nombre1',
    'Apellido1',
    '123456789',
    'Dirección1',
    true,
    '2024-02-27',
    'hashed_password1',
    false,
    1
), (
    'nombreUsuario2',
    'correoUsuario2@example.com',
    'Nombre2',
    'Apellido2',
    '987654321',
    'Dirección2',
    true,
    '2024-02-27',
    'hashed_password2',
    false,
    2
);

create table code_verify(
    id_code serial not null,
    verification_code varchar(50) not null,
    emision_date date not null, 
    expire_date date not null,
    users integer not null,
    constraint pk_codeverify primary key(id_code),
    constraint fk_user_codeverify foreign key(users) references users(id_user)
);

CREATE TABLE IF NOT EXISTS modules(
    id_modules serial not null,
    module_name varchar(50) not null,
    constraint pk_modules primary key(id_modules)
);

CREATE TABLE IF NOT EXISTS permission_modules(
    id_permission_modules serial not null,
    users integer not null,
    modules integer not null,
);

create table assigment_userstypes(
	id serial not null,
	users integer not null,
	user_type integer not null,
	constraint pk_assig_ut primary key(id),
	constraint fk_user_assut foreign key(users) references users(id_user),
	constraint fk_ut_assut foreign key(user_type) references user_type(id_usertype)
);