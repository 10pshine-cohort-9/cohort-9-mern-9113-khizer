import { beforeEach, describe, expect, it, vi } from "vitest";
import apiRequest from "../services/api";

describe("apiRequest", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("makes a request successfully", async () => {
    const response = {
      ok: true,
      json: async () => ({ message: "success" }),
    };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));
    const result = await apiRequest("/api/notes");
    expect(result).toEqual({ message: "success" });
    expect(fetch).toHaveBeenCalled();
  });

  it("adds the token to the request", async () => {
    localStorage.setItem("token", "test-token");
    const response = {
      ok: true,
      json: async () => ({ message: "success" }),
    };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));
    await apiRequest("/api/notes");
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: {
          Authorization: "Bearer test-token",
        },
      })
    );
  });

  it("throws an error when the request fails", async () => {
    const response = {
      ok: false,
      json: async () => ({ message: "Not authorized" }),
    };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));
    await expect(apiRequest("/api/notes")).rejects.toThrow("Not authorized");
  });
});