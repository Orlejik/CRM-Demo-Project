package crm.demo.Configutaion.SecurityConfiguration;

import org.springframework.stereotype.Service;
import crm.demo.Enteties.CrmUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.*;
import java.util.function.Function;

@Service
public class UserAuthProvider {
    @Value("${security.jwt.token.secret-key}")
    private String secretKey;

    @PostConstruct
    protected void init() {
        // this is to avoid having the raw secret key available in the JVM
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    /**
     * Извлечение имени пользователя из токена
     *
     * @param token токен
     * @return имя пользователя
     */
    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Генерация токена
     *
     * @param userDetails данные пользователя
     * @return токен
     */
    public String generateSecretToken(UserDetails userDetails) {
        try {
            Map<String, Object> claims = new HashMap<>();
            if (userDetails instanceof CrmUser newUser) {
                claims.put("id", newUser.getId());
                claims.put("firstName", newUser.getFirstName());
                claims.put("lastName", newUser.getLastName());
                claims.put("userName", newUser.getUsername());
                claims.put("rolle", newUser.getRole());
                claims.put("password", newUser.getPassword());
                claims.put("email", newUser.getEmailAddress());
            }
            return createToken(claims, userDetails);
        } catch (Exception e) {
            System.out.println("The error in generate secret token" + e.getMessage());
        }
        return null;
    }

    /**
     * Проверка токена на валидность
     *
     * @param token       токен
     * @param userDetails данные пользователя
     * @return true, если токен валиден
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    /**
     * Извлечение данных из токена
     *
     * @param token           токен
     * @param claimsResolvers функция извлечения данных
     * @param <T>             тип данных
     * @return данные
     */
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
        final Claims claims = extractAllClaims(token);
        return claimsResolvers.apply(claims);
    }

    /**
     * Генерация токена
     *
     * @param extraClaims дополнительные данные
     * @param userDetails данные пользователя
     * @return токен
     */

    public String createToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 100000 * 60 * 24);
        JwtBuilder token = null;
        try {
            token = Jwts.builder()
                    .claims(extraClaims)
                    .subject(userDetails.getUsername())
                    .issuedAt(now)
                    .expiration(validity)
                    .signWith(getSigningKey());
            return token.compact();
        } catch (Exception ex) {
            System.out.println("Error in creating token");
            ex.printStackTrace();
        }
        return null;
    }

    /**
     * Проверка токена на просроченность
     *
     * @param token токен
     * @return true, если токен просрочен
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Извлечение даты истечения токена
     *
     * @param token токен
     * @return дата истечения
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Извлечение всех данных из токена
     *
     * @param token токен
     * @return данные
     */
    private Claims extractAllClaims(String token) {
//        return Jwts.parser().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
        Key key = getSigningKey();
        return Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token).getPayload();

    }

    /**
     * Получение ключа для подписи токена
     *
     * @return ключ
     */
    private SecretKey getSigningKey() {
        byte[] keyBytes = Base64.getDecoder().decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
