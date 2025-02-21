INSERT INTO users (username, password, IS_ADMIN, UL_BRANCH)
VALUES ('admin', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 1, 2);

INSERT INTO users (username, password, UL_BRANCH)
VALUES ('janesmith@ul.com', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 2),
       ('emilyjohnson@ul.com', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 1),
       ('michaelbrown@ul.com', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 1),
       ('sarahwilliams@ul.com', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 1),
       ('joannachebib@ul.com', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 2),
       ('christolioF@ul.com', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 2),
       ('piakassis@ul.com', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 2),
       ('emmalhaber@ul.com', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 2),
       ('hannaaad@ul.com', '$2a$10$qJ4i52JaJBpj/bhHzRavR.rvZzxXExTTVg5eUSMGqQxdsb/FaGIBK', 3);

INSERT INTO countries (name, code)
VALUES ('France', 'FR'),
       ('Italy', 'IT'),
       ('Germany', 'DE'),
       ('Spain', 'ES'),
       ('Portugal', 'PT'),
       ('Netherlands', 'NL'),
       ('Belgium', 'BE'),
       ('Switzerland', 'CH'),
       ('Austria', 'AT'),
       ('Greece', 'GR');

INSERT INTO conventions (name, date, attachment)
VALUES ('Convention 1', '2014-06-03', 'attachment 1'),
       ('Convention 2', '2014-06-03', 'attachment 2'),
       ('Convention 3', '2014-06-03', 'attachment 3'),
       ('Convention 4', '2014-06-03', 'attachment 4'),
       ('Convention 5', '2014-06-03', 'attachment 4'),
       ('Convention 6', '2014-06-03', 'attachment 4'),
       ('Convention 7', '2014-06-03', 'attachment 4'),
       ('Convention 8', '2014-06-03', 'attachment 4'),
       ('Convention 9', '2014-06-03', 'attachment 4'),
       ('Convention 10', '2014-06-03', 'attachment 4'),
       ('Convention 11', '2014-06-03', 'attachment 4'),
       ('Convention 12', '2014-06-03', 'attachment 4'),
       ('Convention 13', '2014-06-03', 'attachment 4'),
       ('Convention 14', '2014-06-03', 'attachment 4'),
       ('Convention 15', '2014-06-03', 'attachment 4'),
       ('Convention 16', '2014-06-03', 'attachment 4'),
       ('Convention 17', '2014-06-03', 'attachment 4'),
       ('Convention 18', '2014-06-03', 'attachment 4'),
       ('Convention 19', '2014-06-03', 'attachment 4'),
       ('Convention 20', '2014-06-03', 'attachment 4'),
       ('Convention 21', '2014-06-03', 'attachment 4'),
       ('Convention 22', '2014-06-03', 'attachment 5'),
       ('Convention 23', '2014-06-03', 'attachment 5'),
       ('Convention 24', '2014-06-03', 'attachment 5'),
       ('Convention 25', '2014-06-03', 'attachment 5'),
       ('Convention 26', '2014-06-03', 'attachment 5'),
       ('Convention 27', '2014-06-03', 'attachment 5'),
       ('Convention 28', '2014-06-03', 'attachment 5'),
       ('Convention 29', '2014-06-03', 'attachment 5'),
       ('Convention 30', '2014-06-03', 'attachment 5'),
       ('Convention 31', '2014-06-03', 'attachment 5'),
       ('Convention 32', '2014-06-03', 'attachment 5'),
       ('Convention 33', '2014-06-03', 'attachment 5');

INSERT INTO universities (name, country_id, convention_id, logo_url)
VALUES
    -- France (country_id = 1)
    ('Polytech Paris', 1, 1, 'https://yt3.googleusercontent.com/ytc/AIdro_lt0hVfilYsYU9BecVnkNpVLMdbm8GT8XXgqwxJfulZeas=s900-c-k-c0x00ffffff-no-rj'),
    ('Mine Saint Etienne', 1, 2, 'https://campusnumerique.auvergnerhonealpes.fr/app/uploads/2020/06/logo_minesstetienne.jpg'),
    ('Telecom Paris', 1, 3, 'https://www.telecom-paris.fr/wp-content-EvDsK19/uploads/2024/02/TP-ExEd-RVB-502x660.png'),
    ('Sorbonne University', 1, 4, 'https://emarinlab.obs-banyuls.fr/web/associes/img/logo_sorbonne.png'),
    ('University of Lyon', 1, 5, 'https://www.universite-lyon.fr/uas/ksup/LOGO/UDL_logo_Quadri-01.svg'),

    -- Italy (country_id = 2)
    ('Torino', 2, 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvoilwUtpnMldTPT9HFwXg4WnYh9zv4DLY0Q&s'),
    ('University of Milan', 2, 5, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Unimi-logo.png/320px-Unimi-logo.png'),
    ('Sapienza University of Rome', 2, 6, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Uniroma1.svg/langfr-800px-Uniroma1.svg.png'),
    ('University of Bologna', 2, 7, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Seal_of_the_University_of_Bologna.svg/langfr-160px-Seal_of_the_University_of_Bologna.svg.png'),

    -- Germany (country_id = 3)
    ('Technical University of Munich', 3, 8, 'https://www.dwih-saopaulo.org/files/2019/01/tum-1-954x537.jpg'),
    ('Heidelberg University', 3, 9, 'https://backend.uni-heidelberg.de/sites/default/files/site_logo/icon-symbol-uh-logo-black_1_0.svg'),
    ('Humboldt University of Berlin', 3, 10, 'https://www.ni.hu-berlin.de/de/projekte/henrik-steffens-briefprojekt/logos/humboldt-universitaet-zu-berlin/@@download/Image/HU_Siegel_RGB.png'),

    -- Spain (country_id = 4)
    ('University of Barcelona', 4, 11, 'https://estatics.web.ub.edu/image/company_logo?img_id=2946262&t=1739560121133'),
    ('Complutense University of Madrid', 4, 12, 'https://www.ucm.es/themes/ucm24/media/img/logo.svg'),
    ('Autonomous University of Madrid', 4, 13, 'https://www.uam.es/uam/media/img/1606893866850/uam-solo.svg'),

    -- Portugal (country_id = 5)
    ('University of Lisbon', 5, 14, 'https://th.bing.com/th/id/OIP.FJd7sdHusxJAqJimTugdEwHaKb?w=115&h=180&c=7&r=0&o=5&pid=1.7'),
    ('University of Porto', 5, 15, 'https://th.bing.com/th/id/OIP.JtwjIe_JZ8_CuRK327mhswHaBn?w=349&h=76&c=7&r=0&o=5&pid=1.7'),
    ('University of Coimbra', 5, 16, 'https://mma.prnewswire.com/media/1507229/Universidade_de_Coimbra_Logo.jpg?p=facebook'),

    -- Netherlands (country_id = 6)
    ('University of Amsterdam', 6, 17, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Amsterdamuniversitylogo.svg/langfr-320px-Amsterdamuniversitylogo.svg.png'),
    ('Delft University of Technology', 6, 18, 'https://upload.wikimedia.org/wikipedia/fr/thumb/b/b3/Universit%C3%A9_de_technologie_de_Delft_-_Logo.png/175px-Universit%C3%A9_de_technologie_de_Delft_-_Logo.png'),
    ('Leiden University', 6, 19, 'https://www.universiteitleiden.nl/design-1.1/assets/images/zegel.png'),

    -- Belgium (country_id = 7)
    ('KU Leuven', 7, 20, 'https://th.bing.com/th/id/R.8c1454f0bbd74483a8c8d34699ed9a93?rik=owGreVzz4PcL%2bA&riu=http%3a%2f%2fwww.digitalmeetsculture.net%2fwp-content%2fuploads%2f2012%2f05%2flogo_kuleuven.jpg&ehk=SqE5N%2bHy4tredLtG00BCljYer282y7qwlGjcQQT9zT4%3d&risl=&pid=ImgRaw&r=0'),
    ('Ghent University', 7, 21, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Ghent_University_logo_%28English%29.png/220px-Ghent_University_logo_%28English%29.png'),
    ('Université Libre de Bruxelles', 7, 22, 'https://study-eu.s3.amazonaws.com/uploads/university/universit--libre-de-bruxelles-469-logo.png'),

    -- Switzerland (country_id = 8)
    ('ETH Zurich', 8, 23, 'https://logowik.com/content/uploads/images/eth-zurich1144.jpg'),
    ('University of Zurich', 8, 24, 'https://th.bing.com/th/id/R.4c8ed123f077865fd7c66f32349389a5?rik=%2fII%2fN%2bmYpNunRg&pid=ImgRaw&r=0'),
    ('EPFL', 8, 25, 'https://www.epfl.ch/wp-content/themes/wp-theme-2018/assets/svg/epfl-logo.svg?refresh=now'),

    -- Austria (country_id = 9)
    ('University of Vienna', 9, 26, 'https://www.univie.ac.at/fileadmin/templates/GLOBAL/IMG/uni_logo_220.jpg'),
    ('Vienna University of Technology', 9, 27, 'https://w7.pngwing.com/pngs/288/753/png-transparent-tu-wien-hd-logo-thumbnail.png'),
    ('University of Innsbruck', 9, 28, 'https://th.bing.com/th?id=OSK.823daefb81a6c802a56cc02086b99628&w=102&h=102&c=7&o=6&pid=SANGAM'),

    -- Greece (country_id = 10)
    ('National and Kapodistrian University of Athens', 10, 29, 'https://en.uoa.gr/fileadmin/user_upload/uoa_logo_eng.svg'),
    ('Aristotle University of Thessaloniki', 10, 30, 'https://www.auth.gr/wp-content/uploads/banner-horizontal-black-en.png'),
    ('University of Patras', 10, 31, 'https://www.upatras.gr/wp-content/uploads/upatrasEN.jpg');;

-- Insert students corresponding to the existing users
INSERT INTO students (first_name, last_name, phone_number, std_id, academic_year, department, grade, user_id)
VALUES ('Jane', 'Smith', '1234567891', 1002, 2024, 'Mechanical', 85, 2),
       ('Emily', 'Johnson', '1234567892', 1003, 2024, 'Civil', 88, 3),
       ('Michael', 'Brown', '1234567893', 1004, 2024, 'Petro', 87, 4),
       ('Sarah', 'Williams', '1234567894', 1005, 2024, 'Electrical', 89, 5),
       ('Joanna', 'Chebib', '1234567895', 1006, 2024, 'Computer', 92, 6),
       ('Chris', 'Tolio', '1234567896', 1007, 2024, 'Chemical', 84, 7),
       ('Pia', 'Kassis', '1234567897', 1008, 2024, 'Biomedical', 91, 8),
       ('Emma', 'Lhaber', '1234567898', 1009, 2024, 'Telecom', 86, 9),
       ('Hanna', 'Aad', '1234567890', 1001, 2024, 'Electrical', 90, 10);

-- Insert programs
INSERT INTO programs (description, type, university_id, submission_date, academic_year, department)
VALUES ('AI Research', 'Masters', 1, '2025-01-10', '2024', 'Electrical'),
       ('Data Science', 'Masters', 2, '2025-02-15', '2024', 'Electrical'),
       ('Quantum Mechanics', 'DD', 3, '2025-03-20', '2024', 'Petro'),
       ('Mechanical Engineering', 'DD', 4, '2025-04-25', '2024', 'Mechanical'),
       ('Bridges', 'Masters', 1, '2025-05-30', '2024', 'Civil'),
       ('Renewable Energy', 'Masters', 5, '2025-06-05', '2024', 'Electrical'),
       ('Biomedical Engineering', 'DD', 6, '2025-07-10', '2024', 'Biomedical'),
       ('Aerospace Systems', 'Masters', 7, '2025-08-15', '2024', 'Aerospace'),
       ('Chemical Process Engineering', 'DD', 8, '2025-09-20', '2024', 'Chemical'),
       ('Urban Planning', 'Masters', 9, '2025-10-25', '2024', 'Civil'),
       ('AI Research', 'Masters', 10, '2025-01-10', '2024', 'Electrical'),
       ('Data Science', 'Masters', 11, '2025-02-15', '2024', 'Electrical'),
       ('Quantum Mechanics', 'DD', 12, '2025-03-20', '2024', 'Petro'),
       ('Mechanical Engineering', 'DD', 13, '2025-04-25', '2024', 'Mechanical'),
       ('Bridges', 'Masters', 14, '2025-05-30', '2024', 'Civil'),
       ('Renewable Energy', 'Masters', 15, '2025-06-05', '2024', 'Electrical'),
       ('Biomedical Engineering', 'DD', 16, '2025-07-10', '2024', 'Biomedical'),
       ('Aerospace Systems', 'Masters', 17, '2025-08-15', '2024', 'Aerospace'),
       ('Chemical Process Engineering', 'DD', 18, '2025-09-20', '2024', 'Chemical'),
       ('Urban Planning', 'Masters', 19, '2025-10-25', '2024', 'Civil'),
       ('Mechanical Engineering', 'DD', 20, '2025-04-25', '2024', 'Mechanical'),
       ('Bridges', 'Masters', 22, '2025-05-30', '2024', 'Civil'),
       ('Data Science', 'Masters', 1, '2025-02-15', '2024', 'Electrical'),
       ('Quantum Mechanics', 'DD', 23, '2025-03-20', '2024', 'Petro'),
       ('Mechanical Engineering', 'DD', 5, '2025-04-25', '2024', 'Mechanical'),
       ('Bridges', 'Masters', 15, '2025-05-30', '2024', 'Civil'),
       ('Renewable Energy', 'Masters', 22, '2025-06-05', '2024', 'Electrical'),
       ('Biomedical Engineering', 'DD', 25, '2025-07-10', '2024', 'Biomedical'),
       ('Aerospace Systems', 'Masters', 31, '2025-08-15', '2024', 'Aerospace'),
       ('Chemical Process Engineering', 'DD', 6, '2025-09-20', '2024', 'Chemical'),
       ('Urban Planning', 'Masters', 3, '2025-10-25', '2024', 'Civil'),
       ('Mechanical Engineering', 'DD', 6, '2025-04-25', '2024', 'Mechanical'),
       ('Bridges', 'Masters', 2, '2025-05-30', '2024', 'Civil'),
       ('Renewable Energy', 'Masters', 1, '2025-06-05', '2024', 'Electrical'),
       ('Biomedical Engineering', 'DD', 5, '2025-07-10', '2024', 'Biomedical'),
       ('Aerospace Systems', 'Masters', 24, '2025-08-15', '2024', 'Aerospace'),
       ('Chemical Process Engineering', 'DD', 25, '2025-09-20', '2024', 'Chemical'),
       ('Urban Planning', 'Masters', 26, '2025-10-25', '2024', 'Civil'),
       ('Mechanical Engineering', 'DD', 27, '2025-04-25', '2024', 'Mechanical'),
       ('Bridges', 'Masters', 28, '2025-05-30', '2024', 'Civil'),
       ('Renewable Energy', 'Masters', 29, '2025-06-05', '2024', 'Electrical'),
       ('Biomedical Engineering', 'DD', 30, '2025-07-10', '2024', 'Biomedical'),
       ('Aerospace Systems', 'Masters', 31, '2025-08-15', '2024', 'Aerospace'),
       ('Chemical Process Engineering', 'DD', 32, '2025-09-20', '2024', 'Chemical'),
       ('Urban Planning', 'Masters', 33, '2025-10-25', '2024', 'Civil');


-- Associate students with programs (many-to-many relationship)
INSERT INTO program_student (student_id, program_id, status)
VALUES (1, 1, 'pending'),
       (1, 2, 'enrolled'),
       (2, 2, 'enrolled'),
       (2, 3, 'pending'),
       (3, 3, 'rejected'),
       (3, 4, 'pending'),
       (4, 4, 'enrolled'),
       (4, 5, 'pending'),
       (5, 5, 'enrolled'),
       (5, 1, 'pending'),
       (6, 6, 'enrolled'),
       (6, 7, 'pending'),
       (7, 7, 'rejected'),
       (7, 8, 'pending'),
       (8, 8, 'enrolled'),
       (8, 9, 'pending'),
       (9, 9, 'enrolled'),
       (9, 10, 'pending');

-- Insert scholarships
INSERT INTO scholarships (name, description, duration)
VALUES
    ('Merit Scholarship', 'Awarded to students with outstanding academic performance', 4),
    ('Research Grant', 'Funding for students conducting groundbreaking research', 2),
    ('Sports Excellence', 'Scholarship for students excelling in sports', 3),
    ('Financial Aid', 'Support for students in financial need', 4),
    ('International Student Grant', 'Aid for international students studying abroad', 2),
    ('Women in STEM', 'Scholarship for female students pursuing STEM fields', 4),
    ('Entrepreneurship Grant', 'Funding for students with innovative business ideas', 2),
    ('Arts and Culture Scholarship', 'Support for students excelling in arts and culture', 3),
    ('Community Service Award', 'Award for students actively involved in community service', 2),
    ('Leadership Scholarship', 'Awarded to students demonstrating exceptional leadership skills', 4);

-- Associate students with scholarships (many-to-many relationship)
INSERT INTO student_scholarship (student_id, scholarship_id, status)
VALUES (1, 1, 'pending'),
       (2, 2, 'rejected'),
       (3, 2, 'accepted'),
       (4, 3, 'pending'),
       (5, 3, 'accepted'),
       (6, 4, 'pending'),
       (7, 4, 'rejected'),
       (8, 5, 'accepted'),
       (9, 5, 'pending'),
       (10, 6, 'accepted'),
       (1, 6, 'pending'),
       (2, 7, 'rejected'),
       (3, 7, 'accepted'),
       (4, 8, 'pending'),
       (5, 8, 'accepted'),
       (6, 9, 'pending'),
       (7, 9, 'rejected'),
       (8, 10, 'accepted'),
       (9, 10, 'pending'),
       (10, 1, 'accepted');