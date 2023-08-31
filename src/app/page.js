export default function Home() {
  return (
    <div className="grid h-screen place-items-center">
      <form
        action="/dashboard"
        className="border border-gray-600 rounded-lg bg-white p-7 text-center"
      >
        <label for="email" className="block font-bold mb-3">
          Enter your email:
        </label>

        <input
          type="email"
          id="email"
          size="30"
          required
          placeholder="Enter your Email"
          className="border rounded-lg block mb-3 p-2"
        />
        <button
          type="submit"
          value="Submit"
          className="p-3 border rounded-lg bg-gray-300 font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
