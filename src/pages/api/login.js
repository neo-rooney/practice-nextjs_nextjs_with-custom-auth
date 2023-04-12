import { encode } from "@/lib/jwt";
import { serialize } from "cookie";

function authenticateUser(email, password) {
  const validEmail = "bch3454@gmail.com";
  const validPassword = "strongpassword";
  if (email === validEmail && password === validPassword) {
    console.log("여기");
    return encode({
      id: "abcd1234-cdce-f3as-sd23-d234sdf3",
      name: "Rooney Bae",
      email: "bch3454@gmail.com",
    });
  }
  return null;
}

const login = (req, res) => {
  const { method } = req;
  const { email, password } = req.body;

  if (method !== "POST") {
    // ----(1)
    return res.status(404).end();
  }

  if (!email || !password) {
    return res.status(400).json({
      error: "Missing requried params",
    });
  }

  const user = authenticateUser(email, password);
  if (user) {
    res.setHeader(
      "Set-Cookie",
      serialize("my_auth", user, { path: "/", httpOnly: true })
    );
    return res.json({ success: true });
  } else {
    return res.status(401).json({
      success: false,
      error: "Wrong email or password",
    });
  }
};

export default login;

/**
 * (1)
 * 기본적으로 Next.js의 API 경로는 모든 HTTP 메서드를 허용한다. 하지만 특정 라우트의 경우 특정 메서드만 허용하는 것이 좋다.
 * 예를 들어 새로운 콘텐츠를 만들 때는 POST만 허용하고, 데이터를 읽을 때는 GET, 수정은 PUT, 삭제는 DELETE만 허용하는 것
 */
