package com.example.onlineshop.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.onlineshop.configuration.jwt.JwtUtils;
import com.example.onlineshop.configuration.services.UserDetailsImpl;
import com.example.onlineshop.constant.ERole;
import com.example.onlineshop.dto.SigninDto;
import com.example.onlineshop.entity.Role;
import com.example.onlineshop.entity.User;
import com.example.onlineshop.entity.UserDetail;
import com.example.onlineshop.exception.BadRequestException;
import com.example.onlineshop.exception.NotFoundException;
import com.example.onlineshop.payload.request.SignInRequest;
import com.example.onlineshop.payload.request.SignUpRequest;
import com.example.onlineshop.payload.response.ResponseObject;
import com.example.onlineshop.repository.RoleRepository;
import com.example.onlineshop.repository.UserRepository;
import com.example.onlineshop.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {
	private static Map<String, Object> data = new HashMap<String, Object>();

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ResponseEntity<ResponseObject> login(SignInRequest signInRequest) {
		User user = userRepository.findByUsername(signInRequest.getUsername())
				.orElseThrow(() -> new NotFoundException("aaaaaaaaaaa"));

		if (Objects.isNull(user)) {
			throw new NotFoundException("Tài khoản không tồn tại");
		} else {
			if (passwordEncoder.matches(signInRequest.getPassword(), user.getPassword())) {
				Authentication authentication = authenticationManager
						.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getUsername(),
								signInRequest.getPassword()));

				SecurityContextHolder.getContext().setAuthentication(authentication);
				String jwt = jwtUtils.generateJwtToken(authentication);
				UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

				List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
						.collect(Collectors.toList());

				SigninDto userDto = SigninDto.builder().username(userDetails.getUsername()).role(roles.get(0)).build();

				data.put("userID", user.getId());
				data.put("user", userDto);
				data.put("token", "Bearer " + jwt);
				return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Đăng nhập thành công", data));

			} else {
				throw new BadRequestException("Mật khẩu không đúng");
			}
		}
	}

	@Override
	public ResponseEntity<ResponseObject> register(SignUpRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			throw new BadRequestException("Tên tài khoàn đã tồn tại");
		} else {

			User user = new User();
			user.setUsername(signUpRequest.getUsername());
			user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

			UserDetail userDetail = new UserDetail();
			userDetail.setFullName(signUpRequest.getFullName());
			Date dateCurrent = new Date();
			userDetail.setDob(dateCurrent);
			userDetail.setAvatarUrl("https://res.cloudinary.com/dboo9wwlk/image/upload/v1704471464/earth.jpg.jpg");
			user.setUserDetail(userDetail);
			String strRoles = signUpRequest.getRole();
			if (strRoles == null || strRoles.isEmpty()) {
				Role customerRole = roleRepository.findByName(ERole.ROLE_CUSTOMER)
						.orElseThrow(() -> new NotFoundException("Customer role is not found"));
				user.setRole(customerRole);
			} else {
				switch (strRoles) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new NotFoundException("Admin role is not found"));
					user.setRole(adminRole);
					break;
				case "employee":
					Role employeeRole = roleRepository.findByName(ERole.ROLE_EMPLOYEE)
							.orElseThrow(() -> new NotFoundException("Employee role is not found"));
					user.setRole(employeeRole);
					break;
				default:
					Role customerRole = roleRepository.findByName(ERole.ROLE_CUSTOMER)
							.orElseThrow(() -> new NotFoundException("Customer role is not found"));
					user.setRole(customerRole);
				}
			}

			userRepository.save(user);

			SigninDto userDto = modelMapper.map(user, SigninDto.class);
			userDto.setRole(user.getRole().getName().name());
			data.put("user", userDto);
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("Đăng ký tài khoản thành công", data));
		}
	}

}
