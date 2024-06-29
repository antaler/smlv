INSERT INTO smlv.`user`(id,alias,`birthDate`,email,gender,last_otp,password,verified) VALUES
(UUID(),'paquito45','1990-02-10','paquito@test.com','M',NOW(),'paco',false),
(UUID(),'alsonso','1980-03-20','alsonso@test.com','M',NOW(),'paco1',true),
(UUID(),'jmmartinez','1970-12-20','jmmm@test.com','W',NOW(),'paco2',true),
(UUID(),'alanWake','1960-08-20','alnwk@test.com','M',NOW(),'paco3',true),
(UUID(),'yugi','2000-05-10','Ygo@test.com','M',NOW(),'paco4',false),
(UUID(),'senju','2010-01-29','senju@test.com','W',NOW(),'paco5',false);

# Health data
INSERT INTO smlv.health(userId,gender,height,weight, register_date) VALUES
('c66025ad-2358-11ef-8e67-0242ac130002','H',170,90,NOW());