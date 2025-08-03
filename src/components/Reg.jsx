import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Reg = () => {
  const { register, loginWithGoogle } = useAuthContext();
  const navigate = useNavigate();
  const [photoFile, setPhotoFile] = useState(null);

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const [form, setForm] = useState({
    name: "",
    photo: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let photoURL = "";

      if (photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);

        // const imgbbApiKey = "f1e3cf31096936f1f3525fa425729374"; // 🔑 Replace this with your real key

        // const res = await fetch(`https://api.imgbb.com/1/upload?key=f1e3cf31096936f1f3525fa425729374`, {
        //   method: "POST",
        //   body: formData,
        // });

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_KEY
          }`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        if (data.success) {
          photoURL = data.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      // Now call your custom register function with image
      await register(form.email, form.password, form.name, photoURL);
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      {error && (
        <p className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="photo">
            Profile Image
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="At least 6 characters"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="my-6 text-center text-gray-500">OR</div>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full border border-gray-300 py-2 rounded flex items-center justify-center hover:bg-gray-100 transition"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          alt="Google Logo"
          className="w-6 h-6 mr-2"
        />
        {loading ? "Please wait..." : "Sign up with Google"}
      </button>
    </div>
  );
};

export default Reg;
