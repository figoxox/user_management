package com.demo.application.controller;

import com.demo.application.model.UserModel;
import com.demo.application.repository.UserRepository;
import com.demo.application.service.MailSenderService;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created RestFul Api for UserModel management
 *
 */
@RestController
public class UserController {

	private final String serverUrl = "http://localhost:4200";

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private MailSenderService mailSender;

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/getAllUsers")
	public List<UserModel> getAllUsers() {
		List<UserModel> usrList = (List<UserModel>) userRepository.findAll();
		System.out.println("getAllUsers");

		return usrList;
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/createUser")
	public UserModel createUser(@RequestBody UserModel newUser) {
		if (!isValidEmail(newUser.getEmail())) {
			System.out.println("Invalid Email");
			return null;
		}
		
		if (!isValidRut(newUser.getRut())) {
			System.out.println("Invalid Rut");
			return null;
		}

		newUser.setStatus("registrado");

		// Generate random 36-char token for confirmation link
		newUser.setToken(UUID.randomUUID().toString());
		System.out.println("Adding " + newUser.toString());
		UserModel usr = userRepository.save(newUser);

		mailSender.sendMail(
				  "no-reply@demo.com",
				  newUser.getEmail(),
				  "Confirmation URL",
				  "Please confirm your email on " + serverUrl + "/confirm-email?token=" + newUser.getToken());

		return usr;
	}

	@GetMapping("/getById/{id}")
	public UserModel getByIdUser(@PathVariable("id") long id) {
		Optional<UserModel> usr = userRepository.findById(id);

		return (usr.isPresent()) ? usr.get() : null;
	}

	@PutMapping("/updateUser/{id}")
	public UserModel updateUser(@PathVariable("id") long id, @RequestBody UserModel updateUser) {
		Optional<UserModel> usr = userRepository.findById(id);
		if (!usr.isPresent()) {
			return null;
		}

		usr.get().setName(updateUser.getName());
		usr.get().setRut(updateUser.getRut());
		usr.get().setPhone(updateUser.getPhone());
		usr.get().setEmail(updateUser.getEmail());

		UserModel savedUsr = userRepository.save(usr.get());
		return savedUsr;
	}

	@DeleteMapping("/deleteUser/{id}")
	public void deleteUser(@PathVariable("id") long id) {
		Optional<UserModel> usr = userRepository.findById(id);
		if (usr.isPresent()) {
			System.out.println("Deleting " + usr.toString());
			userRepository.deleteById(usr.get().getId());
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@PutMapping("/confirmEmail/{token}")
	public UserModel confirmEmail(@PathVariable("token") String token) {
		Optional<UserModel> usr = userRepository.findByToken(token);
		if (!usr.isPresent()) {
			return null;
		}

		System.out.println("Email confirmed " + usr.toString());
		usr.get().setStatus("validado");

		UserModel savedUsr = userRepository.save(usr.get());
		return savedUsr;
	}

	/**
	 * isValidEmail
	 *
	 * @param email Email to check
	 * @return boolean with mail checked
	 */
	private static boolean isValidEmail(String email) {
		// Regex Provided by https://owasp.org/www-community/OWASP_Validation_Regex_Repository
		String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\."
				  + "[a-zA-Z0-9_+&*-]+)*@"
				  + "(?:[a-zA-Z0-9-]+\\.)+[a-z"
				  + "A-Z]{2,7}$";

		Pattern pat = Pattern.compile(emailRegex);
		if (email == null) {
			return false;
		}
		return pat.matcher(email).matches();
	}
	
	/**
	 * isValidRut
	 *
	 * @param rut Rut to check
	 * @return boolean with rut checked
	 */
	private boolean isValidRut(String rut) {
		if (rut == null) return false;

		rut = rut.replaceAll("[.]", "").replaceAll("-", "").trim().toUpperCase();
		int rutAux = Integer.parseInt(rut.substring(0, rut.length() - 1));

		char dv = rut.charAt(rut.length() - 1);

		int m = 0, s = 1;
		for (; rutAux != 0; rutAux /= 10) {
			s = (s + rutAux % 10 * (9 - m++ % 6)) % 11;
		}
		
		return dv == (char) (s != 0 ? s + 47 : 75);
	}
}
