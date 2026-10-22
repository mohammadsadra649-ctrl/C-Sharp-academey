using UnityEngine;

// دوربین اول‌شخص: بدنه با Mouse X می‌چرخد، دوربین با Mouse Y محدود به ±80 درجه
public class FirstPersonLook : MonoBehaviour
{
    public float sensitivity = 2f;
    public Transform body;
    private float pitch = 0f;

    void Start()
    {
        Cursor.lockState = CursorLockMode.Locked;
        Cursor.visible = false;
    }

    void Update()
    {
        float mx = Input.GetAxis("Mouse X") * sensitivity;
        float my = Input.GetAxis("Mouse Y") * sensitivity;

        body.Rotate(0f, mx, 0f);
        pitch = Mathf.Clamp(pitch - my, -80f, 80f);
        transform.localRotation = Quaternion.Euler(pitch, 0f, 0f);
    }
}
