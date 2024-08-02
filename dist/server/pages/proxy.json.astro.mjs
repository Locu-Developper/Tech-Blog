export { renderers } from '../renderers.mjs';

const GET = async ({ request }) => {
  const query = new URLSearchParams(new URL(request.url).search);
  const url = query.get("url") ?? "";
  let textRes = await fetch(url).then((res) => res.text()).then((text) => text);
  return new Response(
    JSON.stringify({
      result: textRes
    })
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
