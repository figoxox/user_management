package com.demo.application.model;

import javax.persistence.*;

@Entity
@Table(name = "user_model")
public class UserModel extends AuditModel {
	@Id
	@GeneratedValue
	private long id;
	
	@Column(nullable = false, length = 255)
	private String name;
	
	@Column(nullable = false, length = 20)
	private String rut;
	
	@Column(nullable = false, length = 30)
	private String phone;
	
	@Column(nullable = false, length = 255)
	private String email;
	
	@Column(nullable = false, length = 20)
	private String status;
	
	@Column(length = 36)
	private String token;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRut() {
		return rut;
	}

	public void setRut(String rut) {
		this.rut = rut;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	@Override
	public String toString() {
		return String.format(getClass().getSimpleName() + 
				  "[id=%d, name=%s, rut=%s, phone=%s, email=%s, status=%s]",
				  id, name, rut, phone, email, status);
	}
}
